package com.opiframe.android.helloespoo;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private static final String TAG = "HelloWorld MainActivity";

    private TextView hellotext;
    private Button hellobutton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG,"onCreate");
        setContentView(R.layout.activity_main);
        hellotext = (TextView)findViewById(R.id.hellotext);
        hellobutton = (Button)findViewById(R.id.hellobutton);
        hellobutton.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        hellotext.setText(R.string.hello_world);
    }
}
