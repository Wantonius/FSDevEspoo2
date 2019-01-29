package com.opiframe.android.contactlist;

import android.content.ContentProvider;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseErrorHandler;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;
import android.util.Log;

public class ContactListProvider extends ContentProvider {

    private SQLiteDatabase reader;
    private SQLiteDatabase writer;
    private ContactDatabaseHelper helper;
    private static final String TAG = "ContactListProvider";
    private static final String DATABASE_NAME = "ContactListDatabase.db";
    private static final int DATABASE_VERSION = 1;
    private static final String TABLE_NAME = "MyContacts";
    private static final String CREATE_TABLE =
            "CREATE TABLE IF NOT EXISTS "+TABLE_NAME+" ("+Contact._ID+
            " INTEGER PRIMARY KEY AUTOINCREMENT,"+Contact.FIRSTNAME+" VARCHAR(40),"+
            Contact.LASTNAME+" VARCHAR(40),"+Contact.ADDRESS+" VARCHAR(100),"+Contact.PHONE+
                    " VARCHAR(20),"+Contact.EMAIL+" VARCHAR(50))";

    public ContactListProvider() {
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        // Implement this to handle requests to delete one or more rows.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public String getType(Uri uri) {
        return Contact.CONTENT_TYPE;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        Log.d(TAG,"Insert");
        long rowId = 0;
        rowId = writer.insert(TABLE_NAME,"",values);
        if(rowId < 0) {
            return null;
        }
        Uri temp = ContentUris.withAppendedId(uri,rowId);
        getContext().getContentResolver().notifyChange(temp,null);
        return temp;
    }

    @Override
    public boolean onCreate() {
        Log.d(TAG,"onCreate");
        helper = new ContactDatabaseHelper(getContext(),null,null,0);
        reader = helper.getReadableDatabase();
        writer = helper.getWritableDatabase();
        if(reader == null || writer == null) {
            Log.e(TAG,"Error creating readable and writable database");
            return false;
        }
        return true;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {
        SQLiteQueryBuilder builder = new SQLiteQueryBuilder();
        builder.setTables(TABLE_NAME);
        Cursor c = builder.query(reader, projection,selection,selectionArgs, null,null, sortOrder);
        return c;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
                      String[] selectionArgs) {
        // TODO: Implement this to handle requests to update one or more rows.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    private class ContactDatabaseHelper extends SQLiteOpenHelper {

        public ContactDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
            super(context, DATABASE_NAME, factory, DATABASE_VERSION);
        }

        public ContactDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version, DatabaseErrorHandler errorHandler) {
            super(context, DATABASE_NAME, factory, DATABASE_VERSION, errorHandler);
        }

        @Override
        public void onCreate(SQLiteDatabase sqLiteDatabase) {
            Log.d(TAG,"ContactDatabaseHelper - onCreate");
            sqLiteDatabase.execSQL(CREATE_TABLE);
        }

        @Override
        public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

        }
    }
}
