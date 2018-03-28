package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.huchunying.liquibaseinitdatacreator.LiquibaseInitDataCreatorApp;

import com.huchunying.liquibaseinitdatacreator.domain.TheClass;
import com.huchunying.liquibaseinitdatacreator.repository.TheClassRepository;
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
 * Test class for the TheClassResource REST controller.
 *
 * @see TheClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LiquibaseInitDataCreatorApp.class)
public class TheClassResourceIntTest {

    private static final String DEFAULT_CLASS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CLASS_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NAME = "BBBBBBBBBB";

    @Autowired
    private TheClassRepository theClassRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTheClassMockMvc;

    private TheClass theClass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheClassResource theClassResource = new TheClassResource(theClassRepository);
        this.restTheClassMockMvc = MockMvcBuilders.standaloneSetup(theClassResource)
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
    public static TheClass createEntity(EntityManager em) {
        TheClass theClass = new TheClass()
            .className(DEFAULT_CLASS_NAME)
            .tableName(DEFAULT_TABLE_NAME);
        return theClass;
    }

    @Before
    public void initTest() {
        theClass = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheClass() throws Exception {
        int databaseSizeBeforeCreate = theClassRepository.findAll().size();

        // Create the TheClass
        restTheClassMockMvc.perform(post("/api/the-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theClass)))
            .andExpect(status().isCreated());

        // Validate the TheClass in the database
        List<TheClass> theClassList = theClassRepository.findAll();
        assertThat(theClassList).hasSize(databaseSizeBeforeCreate + 1);
        TheClass testTheClass = theClassList.get(theClassList.size() - 1);
        assertThat(testTheClass.getClassName()).isEqualTo(DEFAULT_CLASS_NAME);
        assertThat(testTheClass.getTableName()).isEqualTo(DEFAULT_TABLE_NAME);
    }

    @Test
    @Transactional
    public void createTheClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theClassRepository.findAll().size();

        // Create the TheClass with an existing ID
        theClass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheClassMockMvc.perform(post("/api/the-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theClass)))
            .andExpect(status().isBadRequest());

        // Validate the TheClass in the database
        List<TheClass> theClassList = theClassRepository.findAll();
        assertThat(theClassList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTheClasses() throws Exception {
        // Initialize the database
        theClassRepository.saveAndFlush(theClass);

        // Get all the theClassList
        restTheClassMockMvc.perform(get("/api/the-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].className").value(hasItem(DEFAULT_CLASS_NAME.toString())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTheClass() throws Exception {
        // Initialize the database
        theClassRepository.saveAndFlush(theClass);

        // Get the theClass
        restTheClassMockMvc.perform(get("/api/the-classes/{id}", theClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theClass.getId().intValue()))
            .andExpect(jsonPath("$.className").value(DEFAULT_CLASS_NAME.toString()))
            .andExpect(jsonPath("$.tableName").value(DEFAULT_TABLE_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTheClass() throws Exception {
        // Get the theClass
        restTheClassMockMvc.perform(get("/api/the-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheClass() throws Exception {
        // Initialize the database
        theClassRepository.saveAndFlush(theClass);
        int databaseSizeBeforeUpdate = theClassRepository.findAll().size();

        // Update the theClass
        TheClass updatedTheClass = theClassRepository.findOne(theClass.getId());
        // Disconnect from session so that the updates on updatedTheClass are not directly saved in db
        em.detach(updatedTheClass);
        updatedTheClass
            .className(UPDATED_CLASS_NAME)
            .tableName(UPDATED_TABLE_NAME);

        restTheClassMockMvc.perform(put("/api/the-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheClass)))
            .andExpect(status().isOk());

        // Validate the TheClass in the database
        List<TheClass> theClassList = theClassRepository.findAll();
        assertThat(theClassList).hasSize(databaseSizeBeforeUpdate);
        TheClass testTheClass = theClassList.get(theClassList.size() - 1);
        assertThat(testTheClass.getClassName()).isEqualTo(UPDATED_CLASS_NAME);
        assertThat(testTheClass.getTableName()).isEqualTo(UPDATED_TABLE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTheClass() throws Exception {
        int databaseSizeBeforeUpdate = theClassRepository.findAll().size();

        // Create the TheClass

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTheClassMockMvc.perform(put("/api/the-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theClass)))
            .andExpect(status().isCreated());

        // Validate the TheClass in the database
        List<TheClass> theClassList = theClassRepository.findAll();
        assertThat(theClassList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTheClass() throws Exception {
        // Initialize the database
        theClassRepository.saveAndFlush(theClass);
        int databaseSizeBeforeDelete = theClassRepository.findAll().size();

        // Get the theClass
        restTheClassMockMvc.perform(delete("/api/the-classes/{id}", theClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TheClass> theClassList = theClassRepository.findAll();
        assertThat(theClassList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TheClass.class);
        TheClass theClass1 = new TheClass();
        theClass1.setId(1L);
        TheClass theClass2 = new TheClass();
        theClass2.setId(theClass1.getId());
        assertThat(theClass1).isEqualTo(theClass2);
        theClass2.setId(2L);
        assertThat(theClass1).isNotEqualTo(theClass2);
        theClass1.setId(null);
        assertThat(theClass1).isNotEqualTo(theClass2);
    }
}
