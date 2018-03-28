package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.huchunying.liquibaseinitdatacreator.LiquibaseInitDataCreatorApp;

import com.huchunying.liquibaseinitdatacreator.domain.TheAttribute;
import com.huchunying.liquibaseinitdatacreator.repository.TheAttributeRepository;
import com.huchunying.liquibaseinitdatacreator.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.huchunying.liquibaseinitdatacreator.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TheAttributeResource REST controller.
 *
 * @see TheAttributeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LiquibaseInitDataCreatorApp.class)
public class TheAttributeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TheAttributeRepository theAttributeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTheAttributeMockMvc;

    private TheAttribute theAttribute;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheAttributeResource theAttributeResource = new TheAttributeResource(theAttributeRepository);
        this.restTheAttributeMockMvc = MockMvcBuilders.standaloneSetup(theAttributeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TheAttribute createEntity(EntityManager em) {
        TheAttribute theAttribute = new TheAttribute()
            .name(DEFAULT_NAME);
        return theAttribute;
    }

    @Before
    public void initTest() {
        theAttribute = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheAttribute() throws Exception {
        int databaseSizeBeforeCreate = theAttributeRepository.findAll().size();

        // Create the TheAttribute
        restTheAttributeMockMvc.perform(post("/api/the-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theAttribute)))
            .andExpect(status().isCreated());

        // Validate the TheAttribute in the database
        List<TheAttribute> theAttributeList = theAttributeRepository.findAll();
        assertThat(theAttributeList).hasSize(databaseSizeBeforeCreate + 1);
        TheAttribute testTheAttribute = theAttributeList.get(theAttributeList.size() - 1);
        assertThat(testTheAttribute.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTheAttributeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theAttributeRepository.findAll().size();

        // Create the TheAttribute with an existing ID
        theAttribute.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheAttributeMockMvc.perform(post("/api/the-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theAttribute)))
            .andExpect(status().isBadRequest());

        // Validate the TheAttribute in the database
        List<TheAttribute> theAttributeList = theAttributeRepository.findAll();
        assertThat(theAttributeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTheAttributes() throws Exception {
        // Initialize the database
        theAttributeRepository.saveAndFlush(theAttribute);

        // Get all the theAttributeList
        restTheAttributeMockMvc.perform(get("/api/the-attributes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theAttribute.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTheAttribute() throws Exception {
        // Initialize the database
        theAttributeRepository.saveAndFlush(theAttribute);

        // Get the theAttribute
        restTheAttributeMockMvc.perform(get("/api/the-attributes/{id}", theAttribute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theAttribute.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTheAttribute() throws Exception {
        // Get the theAttribute
        restTheAttributeMockMvc.perform(get("/api/the-attributes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheAttribute() throws Exception {
        // Initialize the database
        theAttributeRepository.saveAndFlush(theAttribute);
        int databaseSizeBeforeUpdate = theAttributeRepository.findAll().size();

        // Update the theAttribute
        TheAttribute updatedTheAttribute = theAttributeRepository.findOne(theAttribute.getId());
        // Disconnect from session so that the updates on updatedTheAttribute are not directly saved in db
        em.detach(updatedTheAttribute);
        updatedTheAttribute
            .name(UPDATED_NAME);

        restTheAttributeMockMvc.perform(put("/api/the-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheAttribute)))
            .andExpect(status().isOk());

        // Validate the TheAttribute in the database
        List<TheAttribute> theAttributeList = theAttributeRepository.findAll();
        assertThat(theAttributeList).hasSize(databaseSizeBeforeUpdate);
        TheAttribute testTheAttribute = theAttributeList.get(theAttributeList.size() - 1);
        assertThat(testTheAttribute.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTheAttribute() throws Exception {
        int databaseSizeBeforeUpdate = theAttributeRepository.findAll().size();

        // Create the TheAttribute

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTheAttributeMockMvc.perform(put("/api/the-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theAttribute)))
            .andExpect(status().isCreated());

        // Validate the TheAttribute in the database
        List<TheAttribute> theAttributeList = theAttributeRepository.findAll();
        assertThat(theAttributeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTheAttribute() throws Exception {
        // Initialize the database
        theAttributeRepository.saveAndFlush(theAttribute);
        int databaseSizeBeforeDelete = theAttributeRepository.findAll().size();

        // Get the theAttribute
        restTheAttributeMockMvc.perform(delete("/api/the-attributes/{id}", theAttribute.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TheAttribute> theAttributeList = theAttributeRepository.findAll();
        assertThat(theAttributeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TheAttribute.class);
        TheAttribute theAttribute1 = new TheAttribute();
        theAttribute1.setId(1L);
        TheAttribute theAttribute2 = new TheAttribute();
        theAttribute2.setId(theAttribute1.getId());
        assertThat(theAttribute1).isEqualTo(theAttribute2);
        theAttribute2.setId(2L);
        assertThat(theAttribute1).isNotEqualTo(theAttribute2);
        theAttribute1.setId(null);
        assertThat(theAttribute1).isNotEqualTo(theAttribute2);
    }
}
