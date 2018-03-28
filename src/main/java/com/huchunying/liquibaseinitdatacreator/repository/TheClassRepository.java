package com.huchunying.liquibaseinitdatacreator.repository;

import com.huchunying.liquibaseinitdatacreator.domain.TheClass;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TheClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TheClassRepository extends JpaRepository<TheClass, Long> {

}
