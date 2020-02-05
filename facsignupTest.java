package com.example.coursef;
import androidx.test.rule.ActivityTestRule;

import org.junit.Rule;
import org.junit.Test;

import static androidx.test.espresso.Espresso.onData;
import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.closeSoftKeyboard;
import static androidx.test.espresso.action.ViewActions.typeText;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.core.AllOf.allOf;
import static org.junit.Assert.*;

public class facsignupTest {
    @Rule
    public ActivityTestRule<facsignup> activityRule = new ActivityTestRule<>(facsignup.class);
    @Test
    public void fac_signup_text() {
        onView(withId(R.id.input_name)).perform(typeText("sai"), closeSoftKeyboard());
        onView(withId(R.id.input_email)).perform(typeText("ssvhsujisanju@gmail.com"), closeSoftKeyboard());
        onView(withId(R.id.input_num)).perform(typeText("9445996487"), closeSoftKeyboard());
        String[] s1 = activityRule.getActivity().getResources().getStringArray(R.array.Department);
        int size = s1.length;
        for (int i=0; i<size; i++) {
            onView(withId(R.id.spinner)).perform(click());
            onData(is(s1[i])).perform(click());
        }
        onView(withId(R.id.input_password)).perform(typeText("qwerty12345"), closeSoftKeyboard());
        onView(withId(R.id.btn_signup)).perform(click());
    }
    @Test
    public void test_login_btn(){
        onView(withId(R.id.link_login)).perform(click());
    }
}