package com.huchunying.liquibaseinitdatacreator.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.huchunying.liquibaseinitdatacreator.domain.TheAttribute;

import com.huchunying.liquibaseinitdatacreator.repository.TheAttributeRepository;
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
 * REST controller for managing TheAttribute.
 */
@RestController
@RequestMapping("/api")
public class TheAttributeResource {

    private final Logger log = LoggerFactory.getLogger(TheAttributeResource.class);

    private static final String ENTITY_NAME = "theAttribute";

    private final TheAttributeRepository theAttributeRepository;

    public TheAttributeResource(TheAttributeRepository theAttributeRepository) {
        this.theAttributeRepository = theAttributeRepository;
    }

    /**
     * POST  /the-attributes : Create a new theAttribute.
     *
     * @param theAttribute the theAttribute to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theAttribute, or with status 400 (Bad Request) if the theAttribute has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/the-attributes")
    @Timed
    public ResponseEntity<TheAttribute> createTheAttribute(@RequestBody TheAttribute theAttribute) throws URISyntaxException {
        log.debug("REST request to save TheAttribute : {}", theAttribute);
        if (theAttribute.getId() != null) {
            throw new BadRequestAlertException("A new theAttribute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TheAttribute result = theAttributeRepository.save(theAttribute);
        return ResponseEntity.created(new URI("/api/the-attributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /the-attributes : Updates an existing theAttribute.
     *
     * @param theAttribute the theAttribute to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theAttribute,
     * or with status 400 (Bad Request) if the theAttribute is not valid,
     * or with status 500 (Internal Server Error) if the theAttribute couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/the-attributes")
    @Timed
    public ResponseEntity<TheAttribute> updateTheAttribute(@RequestBody TheAttribute theAttribute) throws URISyntaxException {
        log.debug("REST request to update TheAttribute : {}", theAttribute);
        if (theAttribute.getId() == null) {
            return createTheAttribute(theAttribute);
        }
        TheAttribute result = theAttributeRepository.save(theAttribute);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theAttribute.getId().toString()))
            .body(result);
    }

    /**
     * GET  /the-attributes : get all the theAttributes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of theAttributes in body
     */
    @GetMapping("/the-attributes")
    @Timed
    public List<TheAttribute> getAllTheAttributes() {
        log.debug("REST request to get all TheAttributes");
        return theAttributeRepository.findAll();
        }

    /**
     * GET  /the-attributes/:id : get the "id" theAttribute.
     *
     * @param id the id of the theAttribute to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theAttribute, or with status 404 (Not Found)
     */
    @GetMapping("/the-attributes/{id}")
    @Timed
    public ResponseEntity<TheAttribute> getTheAttribute(@PathVariable Long id) {
        log.debug("REST request to get TheAttribute : {}", id);
        TheAttribute theAttribute = theAttributeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(theAttribute));
    }

    /**
     * DELETE  /the-attributes/:id : delete the "id" theAttribute.
     *
     * @param id the id of the theAttribute to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/the-attributes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheAttribute(@PathVariable Long id) {
        log.debug("REST request to delete TheAttribute : {}", id);
        theAttributeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
