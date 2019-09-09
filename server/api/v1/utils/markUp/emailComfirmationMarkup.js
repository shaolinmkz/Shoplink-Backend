const host = `${process.env.HOST}api/v1`;
/**
 * @description Markup for email confirmation
 * @param {string} fullName
 * @param {string} email
 * @param {string} token - email token
 * @returns {string} markup template
 */
const confirmEmailMarkup = (fullName, email, token) => (
  `<head>
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,700i,800&display=swap" rel="stylesheet">
      <style>
        * {
          font-family: 'Nunito', sans-serif;
          }
        .logo-wrapper {
          margin: 0 auto;
          background: #ebc658;
          padding-top: 20px;
          text-align: center;
          }
          .logo-wrapper img {
            width: 70px;
          }
        .fullname {
          font-size: 1em;
          color:  white;
          font-family: 'Nunito', sans-serif;
          }
        .message{
          font-size: 1em;
          color:  white;
          padding: 0 20px;
          font-family: 'Nunito', sans-serif;
          }
        .confirm-link {
          display: inline-block;
          background: #ebc658;
          padding: 10px; 
          color: black;
          text-decoration: none;
          font-size: 1em;
          border-radius: 5px;
          font-family: 'Nunito', sans-serif;
          }
          .confirm-link:hover{
            background: #f7d470;
          }
          body {
            text-align: center;
            padding: 100px;
            font-family: 'Nunito', sans-serif;
          }
          .border-wrapper {
            border: #ebc658 1px solid;
            padding-bottom: 30px;
            background: #363636;
            border-radius:  0 0 20px 20px;
            text-align: center;
          }
          .title{
            color: black;
            font-size: 1.5em;
            padding-bottom: 10px;
            font-family: 'Nunito', sans-serif;
          }
          .content{
            padding: 50px 0;
            text-align: center;
            font-family: 'Nunito', sans-serif;
          }
          #confirm-link{
            cursor: pointer;
          }
      </style>
    </head>
    <body>
      <div class="border-wrapper">
      <div class="logo-wrapper">
        <img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1566508944/shoplink/shop_link.gif"
          alt="shoplink_logo" />
          <h1 class="title">Shoplink</h1>
      </div>
      <div class="content">
        <h3 class="fullname">Hello! ${fullName},</h3>
        <p class="message">
          Just one more step!
          Let's confirm your email address.<br>
        </p>
        <p class="message">Please click the button below to proceed.</p>
      </div>
        <a id="confirm-link" class="confirm-link" href="${host}/email-confirmation?email=${email}&token=${token}" target="_blank" style="color: black; cursor: pointer;">
          Confirm Email
        </a>
      </div>  
    </body>
  </html>
`);

export default confirmEmailMarkup;
