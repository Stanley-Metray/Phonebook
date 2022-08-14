function validate() {
    const message = document.getElementById("message");
    if (document.getElementById("firstName").value == "")
    {
        message.innerText = "Please add first name";
        message.style.display = "block";
        return false;
    }
    else if (document.getElementById("lastName").value == "")
    {
        message.innerText = "Please add last name";
        message.style.display = "block";
        return false;
    }
    else if (document.getElementById("email").value == "")
    {
        message.innerText = "Please add email";
        message.style.display = "block";
        return false;
    }
    else if(!isEmail(document.getElementById("email").value))
    {
        message.innerText = "Please add valid email";
        message.style.display = "block";
        return false;
    }
    else if (document.getElementById("password").value == "")
    {
        message.innerText = "Please add password";
        message.style.display = "block";
        return false;
    }
    else if (document.getElementById("confirmPassword").value == "")
    {
        message.innerText = "Please confirm password";
        message.style.display = "block";
        return false;
    }

    if(document.getElementById("password").value!=document.getElementById("confirmPassword").value)
    {
        message.innerText = "Password must be same";
        message.style.display = "block";
        document.getElementById("confirmPassword").focus();
        return false;
    }
}

function isEmail(email)  
{  
var x=email;  
var atposition=x.indexOf("@");  
var dotposition=x.lastIndexOf(".");  
if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
  return false;  
  }
  else
    return true;
}  