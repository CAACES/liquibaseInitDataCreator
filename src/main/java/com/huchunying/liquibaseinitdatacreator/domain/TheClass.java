package com.huchunying.liquibaseinitdatacreator.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 类
 */
@ApiModel(description = "类")
@Entity
@Table(name = "the_class")
public class TheClass implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "class_name")
    private String className;

    @Column(name = "table_name")
    private String tableName;

    @OneToMany(mappedBy = "theClass")
    @JsonIgnore
    private Set<TheObject> theObjects = new HashSet<>();

    @OneToMany(mappedBy = "theClass")
    @JsonIgnore
    private Set<TheAttribute> theAttributes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public TheClass className(String className) {
        this.className = className;
        return this;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getTableName() {
        return tableName;
    }

    public TheClass tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Set<TheObject> getTheObjects() {
        return theObjects;
    }

    public TheClass theObjects(Set<TheObject> theObjects) {
        this.theObjects = theObjects;
        return this;
    }

    public TheClass addTheObject(TheObject theObject) {
        this.theObjects.add(theObject);
        theObject.setTheClass(this);
        return this;
    }

    public TheClass removeTheObject(TheObject theObject) {
        this.theObjects.remove(theObject);
        theObject.setTheClass(null);
        return this;
    }

    public void setTheObjects(Set<TheObject> theObjects) {
        this.theObjects = theObjects;
    }

    public Set<TheAttribute> getTheAttributes() {
        return theAttributes;
    }

    public TheClass theAttributes(Set<TheAttribute> theAttributes) {
        this.theAttributes = theAttributes;
        return this;
    }

    public TheClass addTheAttribute(TheAttribute theAttribute) {
        this.theAttributes.add(theAttribute);
        theAttribute.setTheClass(this);
        return this;
    }

    public TheClass removeTheAttribute(TheAttribute theAttribute) {
        this.theAttributes.remove(theAttribute);
        theAttribute.setTheClass(null);
        return this;
    }

    public void setTheAttributes(Set<TheAttribute> theAttributes) {
        this.theAttributes = theAttributes;
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
        TheClass theClass = (TheClass) o;
        if (theClass.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), theClass.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TheClass{" +
            "id=" + getId() +
            ", className='" + getClassName() + "'" +
            ", tableName='" + getTableName() + "'" +
            "}";
    }
}
