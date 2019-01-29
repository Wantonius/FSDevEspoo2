package com.opiframe.android.contactlist;

import android.net.Uri;
import android.provider.BaseColumns;

import java.io.Serializable;

public class Contact implements Serializable, BaseColumns{

    private String firstname;
    private String lastname;
    private String address;
    private String phone;
    private String email;

    public static final String FIRSTNAME = "firstname";
    public static final String LASTNAME = "lastname";
    public static final String ADDRESS = "address";
    public static final String PHONE = "phone";
    public static final String EMAIL = "email";

    public static final Uri CONTENT_URI = Uri.parse("content://com.opiframe.android.contactlist.ContactListProvider/MyContacts");
    public static final String CONTENT_TYPE = "vnd.android.cursor/com.opiframe.android.MyContact";

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String toString() {
        return ""+firstname+" "+lastname+", "+address+", "+phone+", "+email;
    }
}
