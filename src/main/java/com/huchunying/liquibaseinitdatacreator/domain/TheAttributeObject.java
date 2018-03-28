package com.huchunying.liquibaseinitdatacreator.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * 属性对象
 */
@ApiModel(description = "属性对象")
@Entity
@Table(name = "the_attribute_object")
public class TheAttributeObject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_value")
    private String value;

    @ManyToOne
    private TheObject theObject;

    @ManyToOne
    private TheAttribute theAttribute;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public TheAttributeObject value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public TheObject getTheObject() {
        return theObject;
    }

    public TheAttributeObject theObject(TheObject theObject) {
        this.theObject = theObject;
        return this;
    }

    public void setTheObject(TheObject theObject) {
        this.theObject = theObject;
    }

    public TheAttribute getTheAttribute() {
        return theAttribute;
    }

    public TheAttributeObject theAttribute(TheAttribute theAttribute) {
        this.theAttribute = theAttribute;
        return this;
    }

    public void setTheAttribute(TheAttribute theAttribute) {
        this.theAttribute = theAttribute;
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
        TheAttributeObject theAttributeObject = (TheAttributeObject) o;
        if (theAttributeObject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), theAttributeObject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TheAttributeObject{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
