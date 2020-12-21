package com.example.coursef;

import android.content.Intent;
import android.os.IBinder;
import androidx.test.filters.MediumTest;
import androidx.test.rule.ActivityTestRule;
import androidx.test.rule.ServiceTestRule;
import androidx.test.runner.AndroidJUnit4;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.isChecked;
import static androidx.test.espresso.matcher.ViewMatchers.isNotChecked;
import static androidx.test.espresso.matcher.ViewMatchers.withId;

@MediumTest
@RunWith(AndroidJUnit4.class)
public class MainActivityTest {
    @Rule
    public ActivityTestRule<MainActivity> activityRule = new ActivityTestRule<>(MainActivity.class);
    @Test
    public void test_enter1(){
        onView(withId(R.id.Student)).perform(click());
        onView(withId(R.id.Student)).check(matches(isChecked()));
        onView(withId(R.id.faculty)).check(matches(isNotChecked()));
//        onView(withId(R.id.faculty)).perform(click());
//        onView(withId(R.id.faculty)).check(matches(isChecked()));
//        onView(withId(R.id.Student)).check(matches(isNotChecked()));
        onView(withId(R.id.Enter)).perform(click());
    }
    @Test
    public void test_enter2(){
//        onView(withId(R.id.Student)).perform(click());
//        onView(withId(R.id.Student)).check(matches(isChecked()));
//        onView(withId(R.id.faculty)).check(matches(isNotChecked()));
        onView(withId(R.id.faculty)).perform(click());
        onView(withId(R.id.faculty)).check(matches(isChecked()));
        onView(withId(R.id.Student)).check(matches(isNotChecked()));
        onView(withId(R.id.Enter)).perform(click());
    }
    @Test
    public void test_enter3(){
        onView(withId(R.id.Student)).check(matches(isNotChecked()));
        onView(withId(R.id.faculty)).check(matches(isNotChecked()));
        onView(withId(R.id.Enter)).perform(click());
    }

}