package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.huchunying.liquibaseinitdatacreator.domain.TheAttributeObject;

import com.huchunying.liquibaseinitdatacreator.repository.TheAttributeObjectRepository;
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
 * REST controller for managing TheAttributeObject.
 */
@RestController
@RequestMapping("/api")
public class TheAttributeObjectResource {

    private final Logger log = LoggerFactory.getLogger(TheAttributeObjectResource.class);

    private static final String ENTITY_NAME = "theAttributeObject";

    private final TheAttributeObjectRepository theAttributeObjectRepository;

    public TheAttributeObjectResource(TheAttributeObjectRepository theAttributeObjectRepository) {
        this.theAttributeObjectRepository = theAttributeObjectRepository;
    }

    /**
     * POST  /the-attribute-objects : Create a new theAttributeObject.
     *
     * @param theAttributeObject the theAttributeObject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theAttributeObject, or with status 400 (Bad Request) if the theAttributeObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/the-attribute-objects")
    @Timed
    public ResponseEntity<TheAttributeObject> createTheAttributeObject(@RequestBody TheAttributeObject theAttributeObject) throws URISyntaxException {
        log.debug("REST request to save TheAttributeObject : {}", theAttributeObject);
        if (theAttributeObject.getId() != null) {
            throw new BadRequestAlertException("A new theAttributeObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TheAttributeObject result = theAttributeObjectRepository.save(theAttributeObject);
        return ResponseEntity.created(new URI("/api/the-attribute-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /the-attribute-objects : Updates an existing theAttributeObject.
     *
     * @param theAttributeObject the theAttributeObject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theAttributeObject,
     * or with status 400 (Bad Request) if the theAttributeObject is not valid,
     * or with status 500 (Internal Server Error) if the theAttributeObject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/the-attribute-objects")
    @Timed
    public ResponseEntity<TheAttributeObject> updateTheAttributeObject(@RequestBody TheAttributeObject theAttributeObject) throws URISyntaxException {
        log.debug("REST request to update TheAttributeObject : {}", theAttributeObject);
        if (theAttributeObject.getId() == null) {
            return createTheAttributeObject(theAttributeObject);
        }
        TheAttributeObject result = theAttributeObjectRepository.save(theAttributeObject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theAttributeObject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /the-attribute-objects : get all the theAttributeObjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of theAttributeObjects in body
     */
    @GetMapping("/the-attribute-objects")
    @Timed
    public List<TheAttributeObject> getAllTheAttributeObjects() {
        log.debug("REST request to get all TheAttributeObjects");
        return theAttributeObjectRepository.findAll();
        }

    /**
     * GET  /the-attribute-objects/:id : get the "id" theAttributeObject.
     *
     * @param id the id of the theAttributeObject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theAttributeObject, or with status 404 (Not Found)
     */
    @GetMapping("/the-attribute-objects/{id}")
    @Timed
    public ResponseEntity<TheAttributeObject> getTheAttributeObject(@PathVariable Long id) {
        log.debug("REST request to get TheAttributeObject : {}", id);
        TheAttributeObject theAttributeObject = theAttributeObjectRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(theAttributeObject));
    }

    /**
     * DELETE  /the-attribute-objects/:id : delete the "id" theAttributeObject.
     *
     * @param id the id of the theAttributeObject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/the-attribute-objects/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheAttributeObject(@PathVariable Long id) {
        log.debug("REST request to delete TheAttributeObject : {}", id);
        theAttributeObjectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
