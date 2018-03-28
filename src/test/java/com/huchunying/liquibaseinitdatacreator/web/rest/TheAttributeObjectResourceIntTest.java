package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.huchunying.liquibaseinitdatacreator.LiquibaseInitDataCreatorApp;

import com.huchunying.liquibaseinitdatacreator.domain.TheAttributeObject;
import com.huchunying.liquibaseinitdatacreator.repository.TheAttributeObjectRepository;
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
 * Test class for the TheAttributeObjectResource REST controller.
 *
 * @see TheAttributeObjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LiquibaseInitDataCreatorApp.class)
public class TheAttributeObjectResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private TheAttributeObjectRepository theAttributeObjectRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTheAttributeObjectMockMvc;

    private TheAttributeObject theAttributeObject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheAttributeObjectResource theAttributeObjectResource = new TheAttributeObjectResource(theAttributeObjectRepository);
        this.restTheAttributeObjectMockMvc = MockMvcBuilders.standaloneSetup(theAttributeObjectResource)
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
    public static TheAttributeObject createEntity(EntityManager em) {
        TheAttributeObject theAttributeObject = new TheAttributeObject()
            .value(DEFAULT_VALUE);
        return theAttributeObject;
    }

    @Before
    public void initTest() {
        theAttributeObject = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheAttributeObject() throws Exception {
        int databaseSizeBeforeCreate = theAttributeObjectRepository.findAll().size();

        // Create the TheAttributeObject
        restTheAttributeObjectMockMvc.perform(post("/api/the-attribute-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theAttributeObject)))
            .andExpect(status().isCreated());

        // Validate the TheAttributeObject in the database
        List<TheAttributeObject> theAttributeObjectList = theAttributeObjectRepository.findAll();
        assertThat(theAttributeObjectList).hasSize(databaseSizeBeforeCreate + 1);
        TheAttributeObject testTheAttributeObject = theAttributeObjectList.get(theAttributeObjectList.size() - 1);
        assertThat(testTheAttributeObject.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createTheAttributeObjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theAttributeObjectRepository.findAll().size();

        // Create the TheAttributeObject with an existing ID
        theAttributeObject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheAttributeObjectMockMvc.perform(post("/api/the-attribute-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theAttributeObject)))
            .andExpect(status().isBadRequest());

        // Validate the TheAttributeObject in the database
        List<TheAttributeObject> theAttributeObjectList = theAttributeObjectRepository.findAll();
        assertThat(theAttributeObjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTheAttributeObjects() throws Exception {
        // Initialize the database
        theAttributeObjectRepository.saveAndFlush(theAttributeObject);

        // Get all the theAttributeObjectList
        restTheAttributeObjectMockMvc.perform(get("/api/the-attribute-objects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theAttributeObject.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getTheAttributeObject() throws Exception {
        // Initialize the database
        theAttributeObjectRepository.saveAndFlush(theAttributeObject);

        // Get the theAttributeObject
        restTheAttributeObjectMockMvc.perform(get("/api/the-attribute-objects/{id}", theAttributeObject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theAttributeObject.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTheAttributeObject() throws Exception {
        // Get the theAttributeObject
        restTheAttributeObjectMockMvc.perform(get("/api/the-attribute-objects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheAttributeObject() throws Exception {
        // Initialize the database
        theAttributeObjectRepository.saveAndFlush(theAttributeObject);
        int databaseSizeBeforeUpdate = theAttributeObjectRepository.findAll().size();

        // Update the theAttributeObject
        TheAttributeObject updatedTheAttributeObject = theAttributeObjectRepository.findOne(theAttributeObject.getId());
        // Disconnect from session so that the updates on updatedTheAttributeObject are not directly saved in db
        em.detach(updatedTheAttributeObject);
        updatedTheAttributeObject
            .value(UPDATED_VALUE);

        restTheAttributeObjectMockMvc.perform(put("/api/the-attribute-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheAttributeObject)))
            .andExpect(status().isOk());

        // Validate the TheAttributeObject in the database
        List<TheAttributeObject> theAttributeObjectList = theAttributeObjectRepository.findAll();
        assertThat(theAttributeObjectList).hasSize(databaseSizeBeforeUpdate);
        TheAttributeObject testTheAttributeObject = theAttributeObjectList.get(theAttributeObjectList.size() - 1);
        assertThat(testTheAttributeObject.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingTheAttributeObject() throws Exception {
        int databaseSizeBeforeUpdate = theAttributeObjectRepository.findAll().size();

        // Create the TheAttributeObject

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTheAttributeObjectMockMvc.perform(put("/api/the-attribute-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theAttributeObject)))
            .andExpect(status().isCreated());

        // Validate the TheAttributeObject in the database
        List<TheAttributeObject> theAttributeObjectList = theAttributeObjectRepository.findAll();
        assertThat(theAttributeObjectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTheAttributeObject() throws Exception {
        // Initialize the database
        theAttributeObjectRepository.saveAndFlush(theAttributeObject);
        int databaseSizeBeforeDelete = theAttributeObjectRepository.findAll().size();

        // Get the theAttributeObject
        restTheAttributeObjectMockMvc.perform(delete("/api/the-attribute-objects/{id}", theAttributeObject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TheAttributeObject> theAttributeObjectList = theAttributeObjectRepository.findAll();
        assertThat(theAttributeObjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TheAttributeObject.class);
        TheAttributeObject theAttributeObject1 = new TheAttributeObject();
        theAttributeObject1.setId(1L);
        TheAttributeObject theAttributeObject2 = new TheAttributeObject();
        theAttributeObject2.setId(theAttributeObject1.getId());
        assertThat(theAttributeObject1).isEqualTo(theAttributeObject2);
        theAttributeObject2.setId(2L);
        assertThat(theAttributeObject1).isNotEqualTo(theAttributeObject2);
        theAttributeObject1.setId(null);
        assertThat(theAttributeObject1).isNotEqualTo(theAttributeObject2);
    }
}
