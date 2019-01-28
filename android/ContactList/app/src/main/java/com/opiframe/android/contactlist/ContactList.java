package com.opiframe.android.contactlist;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

public class ContactList extends AppCompatActivity {

    private static final String TAG ="ContactList";
    private ContactListAdapter adapter;
    private ListView lw;
    private Button add;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_list);
        lw = findViewById(R.id.contactlistview);
        adapter = new ContactListAdapter(this,0,0);
        lw.setAdapter(adapter);
        add = (Button)findViewById(R.id.addbutton);
        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(ContactList.this,ContactDetailActivity.class);
                startActivityForResult(i,100);
            }
        });
    }

    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        if(req == 100) {
            if(res == Activity.RESULT_OK) {
                Contact temp = new Contact();
                temp.setFirstname(data.getStringExtra("firstname"));
                temp.setLastname(data.getStringExtra("lastname"));
                temp.setAddress(data.getStringExtra("address"));
                temp.setEmail(data.getStringExtra("email"));
                temp.setPhone(data.getStringExtra("phone"));
                adapter.add(temp);
                adapter.notifyDataSetChanged();
            }
        }

    }

    private class ContactListAdapter extends ArrayAdapter<Contact> {

        public ContactListAdapter(@NonNull Context context, int resource) {
            super(context, resource);
        }

        public ContactListAdapter(@NonNull Context context, int resource, int textViewResourceId) {
            super(context, resource, textViewResourceId);
        }

        public ContactListAdapter(@NonNull Context context, int resource, @NonNull Contact[] objects) {
            super(context, resource, objects);
        }

        public ContactListAdapter(@NonNull Context context, int resource, int textViewResourceId, @NonNull Contact[] objects) {
            super(context, resource, textViewResourceId, objects);
        }

        public ContactListAdapter(@NonNull Context context, int resource, @NonNull List<Contact> objects) {
            super(context, resource, objects);
        }

        public ContactListAdapter(@NonNull Context context, int resource, int textViewResourceId, @NonNull List<Contact> objects) {
            super(context, resource, textViewResourceId, objects);
        }

        public View getView(int pos, View convertView, ViewGroup parent) {
            if(convertView == null) {
                convertView = getLayoutInflater().inflate(R.layout.contact_list_row_layout, null);
            }
            TextView nameView = convertView.findViewById(R.id.row_name);
            TextView addressView = convertView.findViewById(R.id.row_address);
            TextView phoneView = convertView.findViewById(R.id.row_phone);
            TextView emailView = convertView.findViewById(R.id.row_email);
            String temp = adapter.getItem(pos).getFirstname()+" "+adapter.getItem(pos).getLastname();
            nameView.setText(temp);
            addressView.setText(adapter.getItem(pos).getAddress());
            phoneView.setText(adapter.getItem(pos).getPhone());
            emailView.setText(adapter.getItem(pos).getEmail());
            return convertView;
        }
    }
}
