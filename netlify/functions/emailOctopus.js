export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    
    const apiKey = process.env.EMAILOCTOPUS_API_KEY;
    const listId = process.env.EMAILOCTOPUS_LIST_ID;
    
    const { name, email, message, subscribe, asdasdcakkkk2k2kk3 } = JSON.parse(event.body);

    if(asdasdcakkkk2k2kk3 == ""){
      
          let body = JSON.stringify({
              email_address: email,
              fields: {
                FirstName: name,
                Message: message,
                Source: "Website"
              },
              status: (subscribe) ? 'subscribed' : 'pending'
            })

          let request = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: body
          }

          const response = await fetch(`https://api.emailoctopus.com/lists/${listId}/contacts`, request);

          const data = await response.json();

          if (!response.ok) {
            console.error('EmailOctopus error response:', data);
            return {
              statusCode: response.status,
              body: JSON.stringify({ error: data.error?.message || 'Unknown error' })
            };
          } else {

            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    success: true, 
                    data 
                })
            };

          }
    } else {

      return {
          statusCode: 200,
          body: '{"success": true}'
      };

    }

  } catch (err) {
    console.error('Server error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
