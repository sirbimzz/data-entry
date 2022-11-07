@ECHO OFF
TITLE Execute python script on anaconda environment
ECHO Please Wait...
:: Section 1: Activate the environment.
ECHO ============================
ECHO Conda Activate
ECHO ============================
@CALL "E:\Digital\Anaconda\Scripts\activate.bat" base
:: Section 2: Execute python script.
ECHO ============================
ECHO Python batch_upload.py
ECHO ============================
python "E:\Digital\datacentric\dataEntry\py\batch_upload.py"



ECHO ============================
ECHO End
ECHO ============================