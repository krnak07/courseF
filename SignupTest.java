package com.example.coursef;

import androidx.test.espresso.matcher.ViewMatchers;
import androidx.test.rule.ActivityTestRule;
import org.junit.Rule;
import org.junit.Test;
import static androidx.test.espresso.Espresso.onData;
import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.closeSoftKeyboard;
import static androidx.test.espresso.action.ViewActions.typeText;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.isEnabled;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withSpinnerText;
import static androidx.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.CoreMatchers.allOf;
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.Matchers.anything;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

public class SignupTest {
    @Rule
    public ActivityTestRule<Signup> activityRule = new ActivityTestRule<>(Signup.class);
    @Test
    public void test_signin_text() {
        onView(withId(R.id.input_name)).perform(typeText(""), closeSoftKeyboard());
        onView(withId(R.id.input_email)).perform(typeText(""), closeSoftKeyboard());
        onView(withId(R.id.input_num)).perform(typeText(""), closeSoftKeyboard());
        String[] s1 = activityRule.getActivity().getResources().getStringArray(R.array.Department);
        String[] s2 = activityRule.getActivity().getResources().getStringArray(R.array.Year);
        int size2 = s2.length;
        int size = s1.length;
        for (int i=0; i<size; i++) {
            onView(withId(R.id.spinner)).perform(click());
            onData(is(s1[i])).perform(click());
        }
        for (int i=0; i<size2; i++) {
            onView(withId(R.id.spinnertwo)).perform(click());
            onData(is(s2[i])).perform(click());
        }
        onView(withId(R.id.input_password)).perform(typeText(""), closeSoftKeyboard());
        onView(withId(R.id.btn_signup)).perform(click());
    }

    @Test
    public void test_login_btn(){
        onView(withId(R.id.link_login)).perform(click());
    }

}