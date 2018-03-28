package com.huchunying.liquibaseinitdatacreator.repository;

import com.huchunying.liquibaseinitdatacreator.domain.TheAttributeObject;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TheAttributeObject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TheAttributeObjectRepository extends JpaRepository<TheAttributeObject, Long> {

}
