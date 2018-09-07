(function() {
  /**
   * Temporary storage for users data
   */
  let savedContactsList = []
  let userContact = {
    name: "",
    email: "",
    homeAddress: "N/A",
    officeAddress: "N/A",
    organization: "N/A",
    mobileNumber: "N/A",
    officialNumber: "N/A",
    facebookContact: "N/A"
  }

  /**
   * Get all required elements Id
   */
  const contactDetails = document.getElementById("contactDetails");
  const toggle = document.getElementById("toggle");
  const contactMenu = document.getElementById("contactMenu");
  const contactList = document.getElementById("contactList");
  const contactForm = document.getElementById("contactForm");
  const savedContacts = document.getElementById("savedContacts");
  const add = document.getElementById("add");
  const details = document.getElementById("details");
  const list = document.getElementById("list");


  const contactMenuClass = contactMenu.classList

  /**
   * onchange event for new contact form
   * @param { object } event 
   */
  this.onchange = function(event) {
    userContact = Object.assign({},
      userContact, {
        [event.target.name]: event.target.value
      })
  }

  /**
   * Handles form submission for new user
   * @param { event } event 
   */
  this.onsubmit = function(event) {
    event.preventDefault();
    const { errors } = validateEntry({...userContact })
    if (errors.name) {
      return alert(errors.name)
    }
    if (errors.email) {
      return alert(errors.email)
    }
    updateContactList()
  }

  /**
   * Onclick event to toggle menu
   */
  toggle.addEventListener("click", function(event) {
    event.preventDefault();
    const isHidden = contactMenuClass.contains("hidden");
    if (isHidden) {
      contactMenuClass.remove("hidden");
    } else {
      contactMenuClass.add("hidden");
    }
  });

  /**
   * The next three functions handles onclick event  when
   * brower window is minimized.
   */

  /**
   * Onclick event show contact form
   */
  add.addEventListener("click", function(event) {
    event.preventDefault();
    add.classList.add("active");
    details.classList.remove("active");
    list.classList.remove("active");
    savedContacts.classList.add("hidden");
    contactDetails.classList.add("hidden");
    contactForm.classList.remove("hidden");
    contactMenuClass.add("hidden");
  });

  /**
   * Onclick event to show contact details
   */
  details.addEventListener("click", function(event) {
    event.preventDefault();
    add.classList.remove("active");
    details.classList.add("active");
    list.classList.remove("active");
    savedContacts.classList.add("hidden");
    contactDetails.classList.remove("hidden");
    contactForm.classList.add("hidden");
    contactMenuClass.add("hidden");
  });

  /**
   * Onclick event to show saved contact list
   */
  list.addEventListener("click", function(event) {
    event.preventDefault();
    list.classList.add("active");
    details.classList.remove("active");
    add.classList.remove("active");
    savedContacts.classList.remove("hidden");
    contactDetails.classList.add("hidden");
    contactForm.classList.add("hidden");
    contactMenuClass.add("hidden");
  });

  /**
   * This adds new contact to  saved list and sorts alphabetically
   */
  function updateContactList() {
    const updatedList = savedContactsList.concat(userContact);
    savedContactsList = updatedList;
    const sortedList = savedContactsList.sort(function(prev, next) {
      return (prev.name).localeCompare(next.name)
    });
    appendChildToContactList(sortedList);
  }

  /**
   * Programatically generate html elements to update displayed list
   * @param { array } sortedList 
   */
  function appendChildToContactList(sortedList) {
    contactList.innerHTML = sortedList.map(function(item, index) {
      return `<li id=${index} class="list-item"><a>${item.name}<a/>
       <br>
       <i class="email">${item.email}</i>
   </li>`
    }).join("");
  }

  /**
   * Event listener to listen to window resize
   * This shows or hide elements for a better UX
   */

  let windowWidth;
  let windowHeight;

  window.addEventListener("resize", function() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (windowWidth <= 860) {
      onScreenReduce();
      document.body.style.width = windowWidth;
      document.body.style.height = windowHeight;
      document.body.style.backgroundRepeat = "repeat"
    } else {
      setDefaultScreenRestore();
    }
  })

  /**
   * This respond to page refresh when window is in a reduced state
   */
  if (performance.navigation.type === 1) {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (windowWidth <= 860) {
      onScreenReduce();
      document.body.style.width = windowWidth;
      document.body.style.height = windowHeight;
      document.body.style.backgroundRepeat = "repeat"
    } else {
      setDefaultScreenRestore();
    }
  }

  /**
   * Styles to set once screen reduce
   */
  function onScreenReduce() {
    toggle.classList.remove("hidden");
    contactMenu.classList.remove("hidden");
    savedContacts.classList.remove("hidden");
    contactDetails.classList.add("hidden");
    contactForm.classList.add("hidden");
  }

  /**
   * Restore modified styles to previous once screen goes back to normal
   */
  function setDefaultScreenRestore() {
    toggle.classList.add("hidden");
    contactMenu.classList.add("hidden");
    contactDetails.classList.remove("hidden");
    contactForm.classList.remove("hidden");
    savedContacts.classList.remove("hidden");
  }

  /**
   * Validate entry to ensure empty contact list is not created
   * @param { string } name
   * @param { string } email
   * @returns { object } errors
   */
  function validateEntry({ name, email }) {
    let errors = {};
    if (!name || name.length === 0) {
      errors.name = "At the least you should supply a contact name"
    }
    if (!email || email.length === 0) {
      errors.email = "At the least you should supply an email"
    }
    return { errors }
  }

  /**
   * Event listener- Listen to click events on contacts clicked
   */
  contactList.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName === "LI") {
      itemClick(event.target.id)
      document.getElementById(event.target.id).classList.add("active");
      const childItems = contactList.children;
      for (let i = 0; i < childItems.length; i++) {
        if (childItems[i].id !== event.target.id) {
          childItems[i].className = ""
        }
      }
    }
  });


  /**
   * Displays details of clicked contacts
   * @param { number } index 
   */
  function itemClick(index) {
    contactDetails.innerHTML = `
   <h3>Contact Details</h3>
   <br>
   <p><span><i>Name:</i>${savedContactsList[index].name}</span></p>
   <p><span><i>Email:</i>${savedContactsList[index].email}</span></p>
   <p><span><i>Home Address:</i>${savedContactsList[index].homeAddress}</span></p>
   <p><span><i>Office Address:</i>${savedContactsList[index].officeAddress}</span></p>
   <p><span><i>Organization:</i>${savedContactsList[index].organization}</span></p>
   <p><span><i>Mobile Number:</i>${savedContactsList[index].mobileNumber}</span></p>
   <p><span><i>Official Number:</i>${savedContactsList[index].officialNumber}</span></p>
   <p><span><i>Facebook:</i>${savedContactsList[index].facebookContact}</span></p>`
  }
})()