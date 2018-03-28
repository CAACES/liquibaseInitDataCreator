package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.huchunying.liquibaseinitdatacreator.domain.TheObject;

import com.huchunying.liquibaseinitdatacreator.repository.TheObjectRepository;
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
 * REST controller for managing TheObject.
 */
@RestController
@RequestMapping("/api")
public class TheObjectResource {

    private final Logger log = LoggerFactory.getLogger(TheObjectResource.class);

    private static final String ENTITY_NAME = "theObject";

    private final TheObjectRepository theObjectRepository;

    public TheObjectResource(TheObjectRepository theObjectRepository) {
        this.theObjectRepository = theObjectRepository;
    }

    /**
     * POST  /the-objects : Create a new theObject.
     *
     * @param theObject the theObject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theObject, or with status 400 (Bad Request) if the theObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/the-objects")
    @Timed
    public ResponseEntity<TheObject> createTheObject(@RequestBody TheObject theObject) throws URISyntaxException {
        log.debug("REST request to save TheObject : {}", theObject);
        if (theObject.getId() != null) {
            throw new BadRequestAlertException("A new theObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TheObject result = theObjectRepository.save(theObject);
        return ResponseEntity.created(new URI("/api/the-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /the-objects : Updates an existing theObject.
     *
     * @param theObject the theObject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theObject,
     * or with status 400 (Bad Request) if the theObject is not valid,
     * or with status 500 (Internal Server Error) if the theObject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/the-objects")
    @Timed
    public ResponseEntity<TheObject> updateTheObject(@RequestBody TheObject theObject) throws URISyntaxException {
        log.debug("REST request to update TheObject : {}", theObject);
        if (theObject.getId() == null) {
            return createTheObject(theObject);
        }
        TheObject result = theObjectRepository.save(theObject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theObject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /the-objects : get all the theObjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of theObjects in body
     */
    @GetMapping("/the-objects")
    @Timed
    public List<TheObject> getAllTheObjects() {
        log.debug("REST request to get all TheObjects");
        return theObjectRepository.findAll();
        }

    /**
     * GET  /the-objects/:id : get the "id" theObject.
     *
     * @param id the id of the theObject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theObject, or with status 404 (Not Found)
     */
    @GetMapping("/the-objects/{id}")
    @Timed
    public ResponseEntity<TheObject> getTheObject(@PathVariable Long id) {
        log.debug("REST request to get TheObject : {}", id);
        TheObject theObject = theObjectRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(theObject));
    }

    /**
     * DELETE  /the-objects/:id : delete the "id" theObject.
     *
     * @param id the id of the theObject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/the-objects/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheObject(@PathVariable Long id) {
        log.debug("REST request to delete TheObject : {}", id);
        theObjectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
