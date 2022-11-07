import smtplib
import math
import pyodbc
import pandas as pd
import numpy as np
from datetime import date
from datetime import datetime
from datetime import timedelta
from email.mime.text import MIMEText
from dateutil import relativedelta
from dateutil.relativedelta import relativedelta

def conn_sql_server(server, db, user, pwd, sql_string):
    """
    Establish connection to SQL Server and return data as DataFrame
    Parameters
    ----------
    server : TYPE
        DESCRIPTION.
    db : TYPE
        DESCRIPTION.
    user : TYPE
        DESCRIPTION.
    pwd : TYPE
        DESCRIPTION.
    sql_string : TYPE
        DESCRIPTION.

    Returns
    -------
    df : TYPE
        DESCRIPTION.

    """
    df = pd.DataFrame()
    try:
        conn = pyodbc.connect(Driver="{SQL Server}", Server=server, Database=db, Trusted_Connection="NO", User=user, Password=pwd)
        print("connection with {} successful".format(db))
        df = pd.read_sql_query(sql_string, conn)
        success = True
    except Exception as e:
        print("connection with {} failed: ->{}".format(db, str(e)))   
        success = False
    return df, success

def insert_SQL(tbl,cols,vals):
    conn = pyodbc.connect(Driver="{SQL Server}", Server="BNY-S-560", Database="dataEntryDB", Trusted_Connection="NO", User="Abimbola.Salami", Password="NLNG@3070")
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO """ + tbl + """ (""" + cols + """)""" + """ VALUES(""" + vals + """);""")
    conn.commit()
    
try:
    txt = "loading batch_file.csv"
    batch_data = pd.read_csv("E:/Digital/datacentric/dataEntry/php/uploads/batch_file.csv")
    batch_info = pd.read_json('E:/Digital/datacentric/dataEntry/php/uploads/batch_info.json')

    tbl = batch_info.tableName[0][+1:]
    curr_user = batch_info.currUser[0][+1:]
    
    txt = "reading batch_file"
    batch_data1 = batch_data
    batch_data2 = batch_data.drop("RecordDate",axis=1)

    batch_col = batch_data2.columns
    for col in batch_col:
        batch_data1 = batch_data1.drop(col,axis=1)
    
    txt = "getting RecordDate from batch_file"
    for i, row in batch_data1.iterrows():
        batch_data1.loc[i, "RecordDate"] = datetime.strptime(batch_data1.at[i, 'RecordDate'], '%d/%m/%Y').strftime('%Y-%m-%d')
        batch_data1.loc[i, "UpdatedDate"] = datetime.today().strftime('%Y-%m-%d')
        batch_data1.loc[i, "UpdatedBy"] = curr_user.title()
    
    txt = "merging batch_file"
    batch_data = pd.concat([batch_data1, batch_data2.reindex(batch_data1.index)], axis=1)

    col_list = batch_data.columns
    j = 0
    
    txt = "posting data to database"
    for i, row in batch_data.iterrows():
        vals = ''
        cols = ''
        for col in col_list:
            cols = cols + col + ","
            vals = vals + "'" + str(batch_data.at[i, col]) + "',"
        vals=vals[:-1]
        cols=cols[:-1]
        insert_SQL(tbl,cols,vals)
        j = j + 1
        batch_info.status[0] = j*100/len(batch_data)
        batch_info.to_json('E:/Digital/datacentric/dataEntry/php/uploads/batch_info.json', orient='records', lines=False)

    batch_info.status[0] = 'Complete'
    batch_info.entryNo[0] = len(batch_data)
    batch_info.to_json('E:/Digital/datacentric/dataEntry/php/uploads/batch_info.json', orient='records', lines=False)
except Exception as e:
    success = False
    error = "Error in " + txt + ". " + str(e)
    error = error.replace('"', '')
    error = error.replace("'", "")
    batch_info.status[0] = error
    batch_info.to_json('E:/Digital/datacentric/dataEntry/php/uploads/batch_info.json', orient='records', lines=False)