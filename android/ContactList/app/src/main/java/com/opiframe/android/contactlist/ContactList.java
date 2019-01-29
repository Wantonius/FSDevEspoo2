package com.opiframe.android.contactlist;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ContentValues;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
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
        lw.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> adapterView, View view, int pos, long id) {
                final int position = pos;
                AlertDialog.Builder builder = new AlertDialog.Builder(ContactList.this);
                builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        adapter.remove(adapter.getItem(position));
                    }
                });
                builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        return;
                    }
                });
                builder.setMessage("Do you wish to delete this?");
                builder.show();
                return true;
            }
        });
        updateAdapter();
    }

    private void updateAdapter() {
        Cursor c = getContentResolver().query(Contact.CONTENT_URI, null, null, null, null);
        if(c.getCount() > 0) {
            adapter.clear();
            c.moveToFirst();
            do {
                    Contact temp = new Contact();
                    temp.setFirstname(c.getString(c.getColumnIndex(Contact.FIRSTNAME)));
                    temp.setLastname(c.getString(c.getColumnIndex(Contact.LASTNAME)));
                    temp.setAddress(c.getString(c.getColumnIndex(Contact.ADDRESS)));
                    temp.setPhone(c.getString(c.getColumnIndex(Contact.PHONE)));
                    temp.setEmail(c.getString(c.getColumnIndex(Contact.EMAIL)));
                    adapter.add(temp);
                } while (c.moveToNext());
            adapter.notifyDataSetChanged();
            }
        }


    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        if(req == 100) {
            if(res == Activity.RESULT_OK) {
                ContentValues v = new ContentValues();
                v.put(Contact.FIRSTNAME,data.getStringExtra("firstname"));
                v.put(Contact.LASTNAME,data.getStringExtra("lastname"));
                v.put(Contact.ADDRESS, data.getStringExtra("address"));
                v.put(Contact.PHONE, data.getStringExtra("phone"));
                v.put(Contact.EMAIL, data.getStringExtra("email"));
                if(getContentResolver().insert(Contact.CONTENT_URI, v) == null) {
                    Log.d(TAG,"Insert failed");
                    return;
                }
                updateAdapter();
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
