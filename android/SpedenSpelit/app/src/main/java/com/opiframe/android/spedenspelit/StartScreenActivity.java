package com.opiframe.android.spedenspelit;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class StartScreenActivity extends AppCompatActivity {
    private static final String TAG = "StartScreenActivity";
    private Button startButton;
    private TextView bestScore;
    private int bestResult = 0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start_screen);
        startButton = findViewById(R.id.startbutton);
        bestScore = findViewById(R.id.bestresultview);
        startButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(StartScreenActivity.this,GameScreenActivity.class);
                startActivityForResult(i,100);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 100) {
            if(resultCode == Activity.RESULT_OK) {
                int result = data.getIntExtra("result",-1);
                if(result > bestResult) {
                    bestScore.setText("Your best result is "+result);
                    bestResult = result;
                }
            }
        }
    }
}
