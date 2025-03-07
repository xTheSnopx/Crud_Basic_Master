package com.sena.crud_basic.Utils;

public class ValidationUtils {

    public static boolean isValidEmail(String email) {
        return email != null && email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }

    public static boolean isValidPhone(String phone) {
        return phone != null && phone.matches("^[0-9]{10}$");
    }
}