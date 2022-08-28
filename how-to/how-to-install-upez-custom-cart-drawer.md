# 🛒 How to install UPEZ Custom Cart Drawer

Follow the instructions below depending on your Shopify theme version. If you are unsure about what version your Shopify theme is, contact our support team at [support@upez.io](mailto:support@upez.io) and we will help you out.

{% tabs %}
{% tab title="Shopify 2.0" %}
1.  Go to your **Shopify Admin**, navigate to **Online Store** and click the **Customize** button on your live theme.

    <figure><img src="../.gitbook/assets/CleanShot 2022-08-23 at 22.59.17.jpg" alt=""><figcaption></figcaption></figure>
2.  Click **Theme settings** on the bottom left corner, then select the **App-embeds** tab on the right panel, then make sure that the toggle button for **UPEZ Custom Cart Drawer** is **ON**

    <figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>
3.  And congratulation, you have successfully installed the UPEZ Custom Cart Drawer. You can add some items to the cart to see how the cart drawer now looks:

    <figure><img src="../.gitbook/assets/CleanShot 2022-08-23 at 23.11.11.jpg" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Shopify 1.0" %}
1.  Go to your **Shopify Admin**, navigate to **Online Store** and click the **3-dot** button (Next to the Customize button) on your live theme.

    <figure><img src="../.gitbook/assets/CleanShot 2022-08-23 at 23.15.26.jpg" alt=""><figcaption></figcaption></figure>
2.  Select `theme.liquid`, and scroll to the bottom of the file until you see the `</body>` tag

    <figure><img src="../.gitbook/assets/CleanShot 2022-08-23 at 23.17.47.jpg" alt=""><figcaption></figcaption></figure>
3. Paste the below script right above the `</body>` tag

<pre class="language-html" data-overflow="wrap"><code class="lang-html"><strong>&#x3C;script src="https://storage.googleapis.com/upez-215da.appspot.com/storefront-scripts%2FupezCart-v0.0.7.js">&#x3C;/script></strong></code></pre>

4\. Hit Save

<figure><img src="../.gitbook/assets/CleanShot 2022-08-23 at 23.21.42.jpg" alt=""><figcaption></figcaption></figure>

5\. And congratulation, you have successfully installed the UPEZ Custom Cart Drawer. You can add some items to the cart to see how the cart drawer now looks:

<figure><img src="../.gitbook/assets/CleanShot 2022-08-23 at 23.11.11.jpg" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

