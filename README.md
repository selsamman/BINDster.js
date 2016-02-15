## Please note that this repository is no longer maintained and supersede by amorphic-bindster

BINDster is an alternative to using HTML templates to create dynamic web applications. BINDster creates a real-time bi-directional link between the DOM and your Javascript object. By using iteration and conditional constructs all of the flexibility of templating is preserved. Because the linkage is bi-directional there is no need for events to capture changes to form elements.

The best way to think of BINDster is in the context of a model, view, controller. BINDster is the glue that "binds" the model to the view.

As the user enters data into form elements in the view, the model is automatically updated. Your controller responds to events like a user clicking on a action. After processing these events BINDster compares the model to the DOM and any changes are reflected in the DOM.

The key features include:

-  Binding data to form elements such as selections, radio buttons check boxes and input fields

-  Conditional tests that insert or remove DOM elements based on the value in the model

-  Iteration which clones a DOM elements for every element of an an array

-   Flexible filtering and error handling insure that bad data never makes it's way into the model

Binding, conditional constructs and iteration are declared directly in the HTML using BINDster-specific attributes in a custom name space so the binding is always clear. If you prefer not to adorn your HTML with BINDster-specific attributes all functions may be applied in Javascript using selectors.

See the [BINDster web site](http://bindster.com "http://bindster.com") for tutorials and documentation.


Here is a quick example:


    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:b="http://bindster.com/bindster.dtd"  xml:lang="en" lang="en">
    	<head>
    		<title>Bindster Simple Iteration</title>
    		<link type="text/css" rel="stylesheet" href="site.css" media="all" />
    		<script type="text/javascript" src="../../js/bindster.js"></script>
    		<script type="text/javascript">
    			var model = {
    				addresses: [
    					{name: "Barack Obama", email:"prez@whitehouse.gov"},
    					{name: "George Bush", email:"gb@alumni.whitehouse.gov"}
    				]
    			}
    		</script>
    	</head>
    	<body>
    		<table>
    			<tbody>
    				<b:iterate on="addresses" index="ax">
    					<tr>
    						<td><input b:bind="addresses[ax].name" /></td>
    						<td><input b:bind="addresses[ax].email" /></td>
    					</tr>
    				</b:iterate>
    			</tbody>
    		</table>
    		<script type="text/javascript">
    			var bindster = new Bindster(model);
    		</script>
    	</body>
    </html>

