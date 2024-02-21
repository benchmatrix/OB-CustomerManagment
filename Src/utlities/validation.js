function checkNull(str)
        {
            if (str == "" || str == "null")
                return "Null";
            else
                return "'" + chkText(str) + "'";
        }
 function chkText(text)
        {
            
            if (text != null)
            text = text.toString().replace("'", "''");
            return text;
        }
        module.exports = checkNull;
   
        