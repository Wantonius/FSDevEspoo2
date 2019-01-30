package com.opiframe.android.spedenspelit;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


public class GameScreenActivity extends AppCompatActivity implements View.OnClickListener {

    private boolean isShowing = false, gameLost = false;
    private Button[] buttonList = new Button[9];
    private int[] buttonIds = new int[9];
    private List<Integer> buttonCycle;
    private int currentTurn = 0, currentScore=0;
    private Random random;
    private int delayValue = 200;
    private GameLogic game;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game_screen);
        buttonList[0] = findViewById(R.id.first);
        buttonIds[0]= R.id.first;
        buttonList[1] = findViewById(R.id.second);
        buttonIds[1] = R.id.second;
        buttonList[2] = findViewById(R.id.third);
        buttonIds[2] = R.id.third;
        buttonList[3] = findViewById(R.id.fourth);
        buttonIds[3] = R.id.fourth;
        buttonList[4] = findViewById(R.id.fifth);
        buttonIds[4] = R.id.fifth;
        buttonList[5] = findViewById(R.id.sixth);
        buttonIds[5] = R.id.sixth;
        buttonList[6] = findViewById(R.id.seventh);
        buttonIds[6] = R.id.seventh;
        buttonList[7] = findViewById(R.id.eighth);
        buttonIds[7] = R.id.eighth;
        buttonList[8] = findViewById(R.id.ninth);
        buttonIds[8] = R.id.ninth;
        for(int i = 0; i<buttonList.length; i++) {
            buttonList[i].setOnClickListener(this);
        }
        random = new Random();
        initGame();
        game = new GameLogic();
        game.execute(buttonCycle.toArray(new Integer[buttonCycle.size()]));

    }

    private int nextButton() {
        return random.nextInt(9);
    }

    private void initGame() {
        buttonCycle = new ArrayList<>();
        for(int j=0;j<3;j++) {
            buttonCycle.add(nextButton());
        }
        currentTurn = 0;
        currentScore = 0;
        isShowing = false;
        gameLost = false;
    }

    @Override
    public void onClick(View view) {
        if(isShowing) {
            return;
        }
        int currentId = view.getId();
        int currentButton = buttonCycle.get(currentTurn);
        if(currentId != buttonIds[currentButton]) {
            gameLost = true;
        } else {
            currentTurn++;
        }
        if(gameLost) {
            Toast.makeText(this, "You lose, WHEE! Your score:"+currentScore,Toast.LENGTH_LONG).show();
            Intent i = getIntent();
            i.putExtra("result", currentScore);
            setResult(Activity.RESULT_OK,i);
            finish();
            return;
        }
        if(currentTurn == buttonCycle.size()) {
            currentScore = currentTurn;
            buttonCycle.add(nextButton());
            currentTurn = 0;
            game = new GameLogic();
            game.execute(buttonCycle.toArray(new Integer[buttonCycle.size()]));
        }
    }

    private class GameLogic extends AsyncTask<Integer, Integer, Void> {

        private boolean isRed = false;
        @Override
        protected Void doInBackground(Integer...buttons ) {
            for(int i=0; i< buttons.length; i++) {
                int tempButton = buttons[i];
                for(int j=0;j<2;j++) {
                    publishProgress(tempButton);
                    try {
                        Thread.sleep(delayValue);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                try {
                    Thread.sleep(delayValue);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            return null;
        }

        @Override
        protected void onPreExecute() {
            isShowing = true;
            Toast.makeText(GameScreenActivity.this, "Showing cycle, please pay attention", Toast.LENGTH_SHORT).show();
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            isShowing = false;
            Toast.makeText(GameScreenActivity.this, "Your turn",Toast.LENGTH_SHORT).show();
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            int tempButton = values[0];
            if(isRed) {
                buttonList[tempButton].setBackgroundColor(getColor(R.color.passiveButton));
                isRed = false;
            } else {
                buttonList[tempButton].setBackgroundColor(getColor(R.color.activeButton));
                isRed = true;
            }
        }
    }
}
