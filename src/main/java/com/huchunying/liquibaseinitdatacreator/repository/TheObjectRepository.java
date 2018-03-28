package com.huchunying.liquibaseinitdatacreator.repository;

import com.huchunying.liquibaseinitdatacreator.domain.TheObject;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TheObject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TheObjectRepository extends JpaRepository<TheObject, Long> {

}
