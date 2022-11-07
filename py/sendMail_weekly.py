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

def get_day_no(dy):
    if dy == "Mon":
        return 0
    elif dy == "Tue":
        return 1
    elif dy == "Wed":
        return 2
    elif dy == "Thu":
        return 3
    elif dy == "Fri":
        return 4
    elif dy == "Sat":
        return 5
    elif dy == "Sun":
        return 6
    else:
        return ""
    
def get_mth_nme(m):
    if m == 1:
        return "Jan"
    elif m == 2:
        return "Feb"
    elif m == 3:
        return "Mar"
    elif m == 4:
        return "Apr"
    elif m == 5:
        return "May"
    elif m == 6:
        return "Jun"
    elif m == 7:
        return "Jul"
    elif m == 8:
        return "Aug"
    elif m == 9:
        return "Sep"
    elif m == 10:
        return "Oct"
    elif m == 11:
        return "Nov"
    elif m == 12:
        return "Dec"
    else:
        return ""
    
def get_mth_num(m):
    if m == "Jan":
        return 1
    elif m == "Feb":
        return 2
    elif m == "Mar":
        return 3
    elif m == "Apr":
        return 4
    elif m == "May":
        return 5
    elif m == "Jun":
        return 6
    elif m == "Jul":
        return 7
    elif m == "Aug":
        return 8
    elif m == "Sep":
        return 9
    elif m == "Oct":
        return 10
    elif m == "Nov":
        return 11
    elif m == "Dec":
        return 12
    else:
        return ""
    
def update_SQL(tbl,col,val,cond,cond_val):
    conn = pyodbc.connect(Driver="{SQL Server}", Server="BNY-S-560", Database="dataEntryDB", Trusted_Connection="NO", User="Abimbola.Salami", Password="NLNG@3070")
    cursor = conn.cursor()
    cursor.execute("""UPDATE """+ tbl + """ SET """ + col + """='"""+ val + """' WHERE """ + cond + """='""" + cond_val + """'""")
    conn.commit()
    
df_Tables, success = conn_sql_server(
        server = "BNY-S-560",
        db = "dataEntryDB",
        user = "Abimbola.Salami",
        pwd = "NLNG@3070",
        sql_string = """SELECT * FROM dbo.dataTables"""
        )
df_Users, success = conn_sql_server(
        server = "BNY-S-560",
        db = "dataEntryDB",
        user = "Abimbola.Salami",
        pwd = "NLNG@3070",
        sql_string = """SELECT * FROM dbo.dataUsers"""
        )
for i, row in df_Tables.iterrows():
    lastUpdate = datetime.strptime(df_Tables.at[i, 'lastUpdate'], '%d/%m/%Y')
    week_no = datetime.today().isocalendar()[1]
    week_no2 = lastUpdate.isocalendar()[1]
    day_no = datetime.today().weekday()
    day_no2 = get_day_no(df_Tables.at[i, 'reportDay'])
    
    if df_Tables.at[i, 'reportFreq']=="Weekly" and df_Tables.at[i, 'getPrompt']=="Yes" and day_no == day_no2:
        curr_table = df_Tables.at[i, 'tableName']
        
        df_data, success = conn_sql_server(
                server = "BNY-S-560",
                db = "dataEntryDB",
                user = "Abimbola.Salami",
                pwd = "NLNG@3070",
                sql_string = """SELECT * FROM dbo.""" + curr_table
                )
        to = ""
        for a, row in df_Users.iterrows():
            if df_Users.at[a, 'tableName']==curr_table and (df_Users.at[a, 'userAccess']=="Admin" or df_Users.at[a, 'userAccess']=="Read & Write"):
                to = to + df_Users.at[a, 'userEmail'] + ", "
                
        start_date = datetime.strptime(df_Tables.at[i, 'dateCreated'], '%d/%m/%Y')
        this_date = datetime.today()
        diff_days = abs((this_date - start_date).days)
        diff_wks = math.ceil(diff_days/7)
        blank_dates = ""
        count = 0
        new_date = start_date
        for b in range(diff_wks):
            if df_data.shape[0] == 0:
                record_found = "NO"
                count = 1
            else:
                for b, row in df_data.iterrows():
                    record_date = datetime.strptime((df_data.at[b, 'RecordDate']).strftime('%d/%m/%Y'), '%d/%m/%Y')
                    if record_date.isocalendar()[1]==new_date.isocalendar()[1] and record_date.year==new_date.year:
                        record_found = "YES"
                        break
                    else:
                        record_found = "NO"
                        count = count+1
            if record_found == "NO":
                blank_dates = blank_dates + "Week " + str(new_date.isocalendar()[1]) + ", " + str(new_date.year) + "\n"
                
            new_date = new_date + timedelta(days=7)
            
        if count!=0:
            to=to[:-2]
            
            
            s = smtplib.SMTP('webmail.nlng.com', 25)
            msg = MIMEText("""Dear User\n\nPlease note that the data for the underlisted week(s) are pending update(s) on the """ + curr_table + """ table.\n\n""" 
                    + blank_dates + """\nKindly follow the link below to provide required updates.\n\n""" + """http://wapp-bny.nlng.net/datacentric/dataEntry/datatable.html?""" + curr_table + """\n\nRegards\nData Entry Portal""")
            sender = 'noreply-dataentry@nlng.com'
            msg['Subject'] = "Data Pending Update on " + curr_table
            msg['From'] = sender
            msg['To'] = to
            s.sendmail(sender, to, msg.as_string())    
            
            update_SQL('dataTables','lastUpdate',datetime.today().strftime('%d/%m/%Y'),'tableName',curr_table)
            print("Mail(s) sent successfully!")
        else:
            print("No mails to be sent!")