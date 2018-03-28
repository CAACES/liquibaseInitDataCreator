package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.huchunying.liquibaseinitdatacreator.LiquibaseInitDataCreatorApp;

import com.huchunying.liquibaseinitdatacreator.domain.TheObject;
import com.huchunying.liquibaseinitdatacreator.repository.TheObjectRepository;
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
 * Test class for the TheObjectResource REST controller.
 *
 * @see TheObjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LiquibaseInitDataCreatorApp.class)
public class TheObjectResourceIntTest {

    @Autowired
    private TheObjectRepository theObjectRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTheObjectMockMvc;

    private TheObject theObject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheObjectResource theObjectResource = new TheObjectResource(theObjectRepository);
        this.restTheObjectMockMvc = MockMvcBuilders.standaloneSetup(theObjectResource)
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
    public static TheObject createEntity(EntityManager em) {
        TheObject theObject = new TheObject();
        return theObject;
    }

    @Before
    public void initTest() {
        theObject = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheObject() throws Exception {
        int databaseSizeBeforeCreate = theObjectRepository.findAll().size();

        // Create the TheObject
        restTheObjectMockMvc.perform(post("/api/the-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theObject)))
            .andExpect(status().isCreated());

        // Validate the TheObject in the database
        List<TheObject> theObjectList = theObjectRepository.findAll();
        assertThat(theObjectList).hasSize(databaseSizeBeforeCreate + 1);
        TheObject testTheObject = theObjectList.get(theObjectList.size() - 1);
    }

    @Test
    @Transactional
    public void createTheObjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theObjectRepository.findAll().size();

        // Create the TheObject with an existing ID
        theObject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheObjectMockMvc.perform(post("/api/the-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theObject)))
            .andExpect(status().isBadRequest());

        // Validate the TheObject in the database
        List<TheObject> theObjectList = theObjectRepository.findAll();
        assertThat(theObjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTheObjects() throws Exception {
        // Initialize the database
        theObjectRepository.saveAndFlush(theObject);

        // Get all the theObjectList
        restTheObjectMockMvc.perform(get("/api/the-objects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theObject.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTheObject() throws Exception {
        // Initialize the database
        theObjectRepository.saveAndFlush(theObject);

        // Get the theObject
        restTheObjectMockMvc.perform(get("/api/the-objects/{id}", theObject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theObject.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTheObject() throws Exception {
        // Get the theObject
        restTheObjectMockMvc.perform(get("/api/the-objects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheObject() throws Exception {
        // Initialize the database
        theObjectRepository.saveAndFlush(theObject);
        int databaseSizeBeforeUpdate = theObjectRepository.findAll().size();

        // Update the theObject
        TheObject updatedTheObject = theObjectRepository.findOne(theObject.getId());
        // Disconnect from session so that the updates on updatedTheObject are not directly saved in db
        em.detach(updatedTheObject);

        restTheObjectMockMvc.perform(put("/api/the-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheObject)))
            .andExpect(status().isOk());

        // Validate the TheObject in the database
        List<TheObject> theObjectList = theObjectRepository.findAll();
        assertThat(theObjectList).hasSize(databaseSizeBeforeUpdate);
        TheObject testTheObject = theObjectList.get(theObjectList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTheObject() throws Exception {
        int databaseSizeBeforeUpdate = theObjectRepository.findAll().size();

        // Create the TheObject

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTheObjectMockMvc.perform(put("/api/the-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theObject)))
            .andExpect(status().isCreated());

        // Validate the TheObject in the database
        List<TheObject> theObjectList = theObjectRepository.findAll();
        assertThat(theObjectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTheObject() throws Exception {
        // Initialize the database
        theObjectRepository.saveAndFlush(theObject);
        int databaseSizeBeforeDelete = theObjectRepository.findAll().size();

        // Get the theObject
        restTheObjectMockMvc.perform(delete("/api/the-objects/{id}", theObject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TheObject> theObjectList = theObjectRepository.findAll();
        assertThat(theObjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TheObject.class);
        TheObject theObject1 = new TheObject();
        theObject1.setId(1L);
        TheObject theObject2 = new TheObject();
        theObject2.setId(theObject1.getId());
        assertThat(theObject1).isEqualTo(theObject2);
        theObject2.setId(2L);
        assertThat(theObject1).isNotEqualTo(theObject2);
        theObject1.setId(null);
        assertThat(theObject1).isNotEqualTo(theObject2);
    }
}
