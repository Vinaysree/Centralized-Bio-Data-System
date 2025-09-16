<?php 
session_start();
$errors=[
    'login'=>$_SESSION['login_error']?? '',
    'register'=>$_SESSION['register_error']?? ''
];
$activeForm=$_SESSION['active_form']?? 'login';
session_unset();

function showError($error){
    return !empty($error) ? "<p class='error-message'>$error</p>" : '';
}

function isActiveForm($formName,$activeForm){
    return $formName===$activeForm ? 'active':'';
}
?> 


<!DOCTYPE html>
<html>
    <head>
        <title>Infoedge</title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css">
    </head>
    <body>
        <!--Home section-->
        <div class="banner">
                <nav>
                    <div class="logo"><p>InfoEdge</p></div>
                    <div class="navbar">
                    <a href="#home" class="nav-link">Home</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#careers" class="nav-link">Careers</a>
                    <a href="#security&privacy" class="nav-link">Security & Privacy</a>
                    <a href="#contact" class="nav-link">Contact</a>
            </nav>
                <section id="home" class="home-section">
                <div class="form-box <?=isActiveForm('login',$activeForm);?>" id="login-form">
                    <div class="form-value">
                        <form action="login-register.php" method="post">
                            <h2>Login</h2>
                            <?=showError($errors['login']); ?>
                            <div class="inputbox">
                                <input type="email" name="email" required>
                                <label for="">Email</label>
                            </div>
                            <div class="inputbox">
                                <input type="password" name="password" required>
                                <label for="">Password</label>
                            </div>
                            <div class="forget">
                                <label for=""><input type="checkbox">Remember Me<a href="#" class="nav-link">Forgot Password?</a></label>
                            </div>
                            <button type="submit" name="login">Log in</button>
                            <div class="register">
                                <p>Don't have an account? <a href="#" onclick="showForm('register')" class="nav-link">Register</a></p>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <div class="form-box <?=isActiveForm('register',$activeForm);?>" id="register-form">
                    <div class="form-value">
                        <form action="login-register.php" method="post">
                            <h2>Register</h2>
                            <?=showError($errors['register']); ?>
                            <div class="inputbox">
                                <input type="text" name="name" required>
                                <label for="">Name</label>
                            </div>
                            <div class="inputbox">
                                <input type="email" name="email" required>
                                <label for="">Email</label>
                            </div>
                            <div class="inputbox">
                                <input type="password" name="password" required>
                                <label for="">Password</label>
                            </div>
                            <!-- <select name="role" required>
                                <option value="">--Select Role--</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select> -->
                            <button type="submit" name="register">Register</button>
                            <div class="register">
                                <p>Already have an account? <a href="#" onclick="showForm('login')" class="nav-link">Login</a></p>
                            </div>
                        </form>
                    </div>
                    
                </div>
                </section>
                
                
              </div>
                <!--About section-->
                <div id="about" class="about-section">
                <div class="about-row">
                  <div class="about-col">
                    <h1 class="section-title">About Us</h1>
                    <p>
                      Our Centralized Bio Data System streamlines personal and professional data management in one secure platform.
                    </p>
                    <br>
                    <p>
                      We ensure quick access, easy updates, and efficient sharing for institutions and individuals alike.
                    </p>
                    <br>
                    <p>
                      Our vision is to create a trusted ecosystem where biodata management is smart, centralized, and accessible — for everyone.
                    </p>  
                    <button type="button">Learn More</button>
                  </div>
                    <div class="about-col">
                      <div class="card card1">
                          <h5>Get a Job</h5>
                      </div>
                      <div class="card card2">
                        <h5>Matrimony</h5>
                    </div>
                    <div class="card card3">
                      <h5>Insurance</h5>
                  </div>
                  <div class="card card4">
                    <h5>Mutual Funds</h5>
                </div>
                </div>
              </div>
              </div>
              <div class="careers-title"><h2>Careers</h2></div>
          <!--Careers section-->
          <div id="careers" class="career-section">
            <!-- carousel -->
    <div class="carousel">
      <!-- list item -->
      <div class="list">
          <div class="item">
              <img src="black img.avif">
              <div class="content">
                  
                  <div class="title">FRONT-END and BACK-END DEVELOPER</div>
                  <div class="topic">We're Recruiting!</div>
                  <div class="des">
                      <!-- lorem 50 -->
                      Join us to craft seamless and responsive user interfaces for our biodata platform.
                  </div>
                  <div class="buttons">
                      <button>SEE MORE</button>
                      <button>RECRUITMENT FAQs</button>
                  </div>
              </div>
          </div>
          <div class="item">
              <img src="black img.avif">
              <div class="content">
                  
                  <div class="title">CYBERSECURITY SPECIALIST</div>
                  <div class="topic">We're Recruiting!</div>
                  <div class="des">
                    Protect sensitive biodata with cutting-edge security solutions—your expertise is our shield.
                  </div>
                  <div class="buttons">
                      <button>SEE MORE</button>
                      <button>RECRUITMENT FAQs</button>
                  </div>
              </div>
          </div>
          <div class="item">
              <img src="black img.avif">
              <div class="content">
                  
                  <div class="title">CLOUD ENGINEER</div>
                  <div class="topic">We're Recruiting!</div>
                  <div class="des">
                    Join us to deploy and scale our centralized biodata system on secure, high-performance cloud platforms.
                  </div>
                  <div class="buttons">
                      <button>SEE MORE</button>
                      <button>RECRUITMENT FAQs</button>
                  </div>
              </div>
          </div>
          <div class="item">
              <img src="black img.avif">
              <div class="content">
                  <div class="title">DATA ANALYST</div>
                  <div class="topic">We're Recruiting!</div>
                  <div class="des">
                    Turn biodata into insights—join us to drive data-driven decisions.
                  </div>
                  <div class="buttons">
                      <button>SEE MORE</button>
                      <button>RECRUITMENT FAQs</button>
                  </div>
              </div>
          </div>
      </div>
      <!-- list thumnail -->
      <div class="thumbnail">
          <div class="item">
              <img src="dataanalyst.jpg">
              <div class="content">
                  <div class="title">
                  </div>
                  <div class="description">
                  </div>
              </div>
          </div>
          <div class="item">
              <img src="front&backend.jpg">
              <div class="content">
                  <div class="title">
                  </div>
                  <div class="description">
                  </div>
              </div>
          </div>
          <div class="item">
              <img src="cybersecurity.jpg">
              <div class="content">
                  <div class="title">
                  </div>
                  <div class="description">
                  </div>
              </div>
          </div>
          <div class="item">
              <img src="cloud.jpg">
              <div class="content">
                  <div class="title">
                  </div>
                  <div class="description">
                  </div>
              </div>
          </div>
      </div>
      <!-- next prev -->

      <div class="arrows">
          <button id="prev"><</button>
          <button id="next">></button>
      </div>
      <!-- time running -->
      <div class="time"></div>
  </div>
  </div>

  <script src="srp.js"></script>
          <!--Contact section-->
          <div class="contacts">
          <div id="contact" class="contact-section">
            <div class="section-content">
                <div class="center">
                    <div class="form-wrapper">
                        <div class="contact-heading">
                            <h1>Let's work together<span>.</span></h1>
                            <p class="text">or reach us via:<a href="mailto:vs12sona@gmail.com">vs12sona@gmail.com</a></p>
                        </div>
                        <form action="srp.html" method="post" class="contact-form">
                            <div class="input-wrap">
                                <input class="contact-input" autocomplete="off" name="FirstName" type="text" required>
                                <label>First Name</label>
                                <i class="icon ri-id-card-fill"></i>
                            </div>
                            <div class="input-wrap">
                                <input class="contact-input" autocomplete="off" name="LastName" type="text" required>
                                <label>Last Name</label>
                                <i class="icon ri-id-card-fill"></i>
                            </div>
                            <div class="input-wrap w-100" >
                                <input class="contact-input" autocomplete="off" name="Email" type="text" required>
                                <label>Email</label>
                                <i class="icon ri-mail-fill"></i>
                            </div>
                            <div class="input-wrap textarea w-100" >
                                <textarea name="Message" autocomplete="off" class="contact-input" required></textarea>
                                <label>Message</label>
                                <i class="icon ri-message-fill"></i>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        </div>
                </div>
                      </div>
                      </div>
                      </div>
                  <!--Footer section-->
                  <section class="footer-section">
                        <div class="row1">
                          <div class="col">
                            <img src="srp logo.jpg" class="logo1">
                            <p>Simplify your biodata management with our smart, centralized system.
                              Secure, accessible, and always up to date.
                              Subscribe now to stay connected and organized!</p>
                          </div>
                          <div class="col">
                            <h3>Office <div class="underline"></div></h3>
                            <p>Road no.45</p>
                            <p>Banjara Hills</p>
                            <p>Hyderabad, PIN 500062, India</p>
                            <p class="email-ids">vs12sona@gmail.com</p>
                            <h4>+91-8374094222</h4>
                          </div>
                          <div class="col">
                            <h3>Links</h3>
                            <ul>
                              <li><a href="#home">Home</a></li>
                              <li><a href="#about">About</a></li>
                              <li><a href="#careers">Careers</a></li>
                              <li><a href="#security&privacy">Security & Privacy</a></li>
                              <li><a href="#contact">Contact</a></li>
                            </ul>
                          </div>
                          <div class="col">

                            <div class="social-icons">
                              <i class="ri-facebook-fill"></i>
                              <i class="ri-twitter-fill"></i>
                              <i class="ri-instagram-fill"></i>
                      
                            </div>
                          </div>
                        </div>
                        <div class="footer-bottom">
                          <p>Info Edge © 2025. All rights reserved.</p>
                        </div>
                      </section>
                  

    </body>
</html>