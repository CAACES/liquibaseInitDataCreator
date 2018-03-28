package com.huchunying.liquibaseinitdatacreator.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 对象
 */
@ApiModel(description = "对象")
@Entity
@Table(name = "the_object")
public class TheObject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private TheClass theClass;

    @OneToMany(mappedBy = "theObject")
    @JsonIgnore
    private Set<TheAttributeObject> theAttributeObjects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TheClass getTheClass() {
        return theClass;
    }

    public TheObject theClass(TheClass theClass) {
        this.theClass = theClass;
        return this;
    }

    public void setTheClass(TheClass theClass) {
        this.theClass = theClass;
    }

    public Set<TheAttributeObject> getTheAttributeObjects() {
        return theAttributeObjects;
    }

    public TheObject theAttributeObjects(Set<TheAttributeObject> theAttributeObjects) {
        this.theAttributeObjects = theAttributeObjects;
        return this;
    }

    public TheObject addTheAttributeObject(TheAttributeObject theAttributeObject) {
        this.theAttributeObjects.add(theAttributeObject);
        theAttributeObject.setTheObject(this);
        return this;
    }

    public TheObject removeTheAttributeObject(TheAttributeObject theAttributeObject) {
        this.theAttributeObjects.remove(theAttributeObject);
        theAttributeObject.setTheObject(null);
        return this;
    }

    public void setTheAttributeObjects(Set<TheAttributeObject> theAttributeObjects) {
        this.theAttributeObjects = theAttributeObjects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TheObject theObject = (TheObject) o;
        if (theObject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), theObject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TheObject{" +
            "id=" + getId() +
            "}";
    }
}
