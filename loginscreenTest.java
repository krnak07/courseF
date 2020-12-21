package com.example.coursef;

import androidx.test.rule.ActivityTestRule;

import org.junit.Rule;
import org.junit.Test;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.closeSoftKeyboard;
import static androidx.test.espresso.action.ViewActions.typeText;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static org.junit.Assert.*;

public class loginscreenTest {
    @Rule
    public ActivityTestRule<loginscreen> activityRule = new ActivityTestRule<>(loginscreen.class);
    @Test
    public void test_login_text() {
        onView(withId(R.id.input_email)).perform(typeText("abc"), closeSoftKeyboard());
        onView(withId(R.id.input_password)).perform(typeText("abcdefgh"), closeSoftKeyboard());
        onView(withId(R.id.btn_login)).perform(click());
    }
    @Test
    public void test_signup_btn(){
        onView(withId(R.id.link_signup)).perform(click());
    }

}