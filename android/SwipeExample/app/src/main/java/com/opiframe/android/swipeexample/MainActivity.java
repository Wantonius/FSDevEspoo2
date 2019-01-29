package com.opiframe.android.swipeexample;

import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    private MyViewPagerAdapter adapter;
    private ViewPager pager;
    private String fragmentMessage = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        pager = findViewById(R.id.pager);
        adapter = new MyViewPagerAdapter(getSupportFragmentManager());
        pager.setAdapter(adapter);

    }
}