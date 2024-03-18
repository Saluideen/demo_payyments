// Copyright (c) 2024, demo and contributors
// For license information, please see license.txt

frappe.ui.form.on('demo_payment', {
	refresh: function (frm) {
		frappe.require([
            "/assets/demo_payyments/js/razorpay.js"
        ]).then(() => {
		frm.add_custom_button(__('Make Payment'), async function () {
			// var docname = frm.docname;
			// window.location.href = '/demo_payment.html'
			const options = await getRazorpayOrderOptions()
			


		});
		async function getRazorpayOrderOptions() {
			frappe.call({
				method: "demo_payyments.www.api.create_order",
				args: {
					'name': frm.docname

				},
				 callback: (r) => {
					console.log(r);
					const options = {
									"key": r.message.key_id,
									"order_id": r.message.order_id,
									"handler": (res) => {
										// window.location = "/store/success";
									}
								}

					const razorpayOrder = createRazorpayOrder(options)
				razorpayOrder.open()

			e.preventDefault()

				 }

			})

		}
		// async function getRazorpayOrderOptions() {
		// 	const headers = {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json; charset=utf-8',
		// 		'X-Frappe-CSRF-Token': '{{ csrf_token }}'
		// 	}

			
		// 	const response = await fetch("demo_payyments.www.api.create_order", {
		// 		method: 'POST',
		// 		body: JSON.stringify({
		// 			name: frm.docname
		// 		}),
		// 		headers
		// 	})

		// 	if (response.ok) {
		// 		const orderData = (await response.json()).message // frappe wraps the response inside "message" key

		// 		const options = {
		// 			"key": orderData.key_id,
		// 			"order_id": orderData.order_id,
		// 			"handler": (res) => {
		// 				// window.location = "/store/success";
		// 			}
		// 		}

		// 		return options
		// 	} else {
		// 		// EXERCISE: Better handling 
		// 		alert("Something went wrong")
		// 		throw Error("")
		// 	}
		// }
		function createRazorpayOrder(options) {
			const razorpayOrder = new Razorpay(options)
			return razorpayOrder
		}
	});

	}
});

