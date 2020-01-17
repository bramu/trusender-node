# trusender-node
Node.js bindings for the TruSender API


Here is the onliner to send the email

```javascript
TruSender.sendEmail("AUTH_TOKEN", "contact_us", "to@address.com", {:data => "here"})
```




Here is one liner to capture the customer activity

```javascript
TruSender.sendEvent("AUTH_TOKEN", "Event Name", "customer@email.com", {:event => "properties here"})
```
