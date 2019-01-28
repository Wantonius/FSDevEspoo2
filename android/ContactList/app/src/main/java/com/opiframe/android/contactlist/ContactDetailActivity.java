package com.opiframe.android.contactlist;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class ContactDetailActivity extends AppCompatActivity {

    private static final String TAG = "ContactDetailActivity";
    private EditText firstname,lastname,address,phone,email;
    private Button save;
    private Intent intent;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d(TAG,"onCreate");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_detail);
        firstname = (EditText) findViewById(R.id.firstnameedit);
        lastname= (EditText) findViewById(R.id.lastnameedit);
        address = (EditText) findViewById(R.id.addressedit);
        phone = (EditText) findViewById(R.id.phoneedit);
        email = (EditText) findViewById(R.id.emailedit);
        save = (Button) findViewById(R.id.savebutton);
        intent = getIntent();
        setResult(Activity.RESULT_CANCELED);
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG,"Save button - onClick");
                intent.putExtra("firstname",firstname.getText().toString());
                intent.putExtra("lastname",lastname.getText().toString());
                intent.putExtra("address",address.getText().toString());
                intent.putExtra("phone",phone.getText().toString());
                intent.putExtra("email",email.getText().toString());
                setResult(Activity.RESULT_OK, intent);
                finish();
            }
        });
    }
}
