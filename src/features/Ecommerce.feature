Feature: Ecommerce validation
	Scenario Outline: Place the order
		Given a login to Ecommerce application with "<username>" and "<password>"
		When Add "ZARA COAT 3" to Cart
		Then Verify "zara coat 3" is displayed in the Cart
		When Enter valid details and Place the Order
		Then Verify order is present in the OrderHistory

		Examples:
			| username                   | password      |
			| mail.srinivasakc@gmail.com | password@1234 |



