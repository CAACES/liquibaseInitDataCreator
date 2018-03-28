package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.huchunying.liquibaseinitdatacreator.domain.TheClass;

import com.huchunying.liquibaseinitdatacreator.repository.TheClassRepository;
import com.huchunying.liquibaseinitdatacreator.web.rest.errors.BadRequestAlertException;
import com.huchunying.liquibaseinitdatacreator.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TheClass.
 */
@RestController
@RequestMapping("/api")
public class TheClassResource {

    private final Logger log = LoggerFactory.getLogger(TheClassResource.class);

    private static final String ENTITY_NAME = "theClass";

    private final TheClassRepository theClassRepository;

    public TheClassResource(TheClassRepository theClassRepository) {
        this.theClassRepository = theClassRepository;
    }

    /**
     * POST  /the-classes : Create a new theClass.
     *
     * @param theClass the theClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theClass, or with status 400 (Bad Request) if the theClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/the-classes")
    @Timed
    public ResponseEntity<TheClass> createTheClass(@RequestBody TheClass theClass) throws URISyntaxException {
        log.debug("REST request to save TheClass : {}", theClass);
        if (theClass.getId() != null) {
            throw new BadRequestAlertException("A new theClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TheClass result = theClassRepository.save(theClass);
        return ResponseEntity.created(new URI("/api/the-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /the-classes : Updates an existing theClass.
     *
     * @param theClass the theClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theClass,
     * or with status 400 (Bad Request) if the theClass is not valid,
     * or with status 500 (Internal Server Error) if the theClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/the-classes")
    @Timed
    public ResponseEntity<TheClass> updateTheClass(@RequestBody TheClass theClass) throws URISyntaxException {
        log.debug("REST request to update TheClass : {}", theClass);
        if (theClass.getId() == null) {
            return createTheClass(theClass);
        }
        TheClass result = theClassRepository.save(theClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /the-classes : get all the theClasses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of theClasses in body
     */
    @GetMapping("/the-classes")
    @Timed
    public List<TheClass> getAllTheClasses() {
        log.debug("REST request to get all TheClasses");
        return theClassRepository.findAll();
        }

    /**
     * GET  /the-classes/:id : get the "id" theClass.
     *
     * @param id the id of the theClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theClass, or with status 404 (Not Found)
     */
    @GetMapping("/the-classes/{id}")
    @Timed
    public ResponseEntity<TheClass> getTheClass(@PathVariable Long id) {
        log.debug("REST request to get TheClass : {}", id);
        TheClass theClass = theClassRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(theClass));
    }

    /**
     * DELETE  /the-classes/:id : delete the "id" theClass.
     *
     * @param id the id of the theClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/the-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheClass(@PathVariable Long id) {
        log.debug("REST request to delete TheClass : {}", id);
        theClassRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
