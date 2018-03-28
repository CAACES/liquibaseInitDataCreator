package com.huchunying.liquibaseinitdatacreator.repository;

import com.huchunying.liquibaseinitdatacreator.domain.TheAttribute;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TheAttribute entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TheAttributeRepository extends JpaRepository<TheAttribute, Long> {

}
