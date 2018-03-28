package com.huchunying.liquibaseinitdatacreator.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 属性
 */
@ApiModel(description = "属性")
@Entity
@Table(name = "the_attribute")
public class TheAttribute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private TheClass theClass;

    @OneToMany(mappedBy = "theAttribute")
    @JsonIgnore
    private Set<TheAttributeObject> theAttributeObjects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TheAttribute name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TheClass getTheClass() {
        return theClass;
    }

    public TheAttribute theClass(TheClass theClass) {
        this.theClass = theClass;
        return this;
    }

    public void setTheClass(TheClass theClass) {
        this.theClass = theClass;
    }

    public Set<TheAttributeObject> getTheAttributeObjects() {
        return theAttributeObjects;
    }

    public TheAttribute theAttributeObjects(Set<TheAttributeObject> theAttributeObjects) {
        this.theAttributeObjects = theAttributeObjects;
        return this;
    }

    public TheAttribute addTheAttributeObject(TheAttributeObject theAttributeObject) {
        this.theAttributeObjects.add(theAttributeObject);
        theAttributeObject.setTheAttribute(this);
        return this;
    }

    public TheAttribute removeTheAttributeObject(TheAttributeObject theAttributeObject) {
        this.theAttributeObjects.remove(theAttributeObject);
        theAttributeObject.setTheAttribute(null);
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
        TheAttribute theAttribute = (TheAttribute) o;
        if (theAttribute.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), theAttribute.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TheAttribute{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
