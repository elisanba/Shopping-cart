let data = {"total":0,"rows":[]};
let totalCost = 0;
		
		
		$(() => {
			$('#cartcontent').datagrid({
				singleSelect:true
			});
			$('.item').draggable({
				revert:true,
				proxy:'clone',
				onStartDrag() {
					$(this).draggable('options').cursor = 'not-allowed';
					$(this).draggable('proxy').css('z-index',10);
				},
				onStopDrag() {
					$(this).draggable('options').cursor='move';
				}
			});
			$('.cart').droppable({
				onDragEnter(e, source) {
					$(source).draggable('options').cursor='auto';
				},
				onDragLeave(e, source) {
					$(source).draggable('options').cursor='not-allowed';
				},
				onDrop(e, source) {
					let name = $(source).find('p:eq(0)').html();
					let price = $(source).find('p:eq(1)').html();
					addProduct(name, parseFloat(price.split('$')[1]));
				}
			});
		});
		
		function addProduct(name,price){
			function add(){
				for(let i=0; i<data.total; i++){
					let row = data.rows[i];
					if (row.name == name){
						row.quantity += 1;
						return;
					}
				}
				data.total += 1;
				data.rows.push({
					name,
					quantity:1,
					price
				});
			}
			add();
			totalCost += price;
			$('#cartcontent').datagrid('loadData', data);
			$('div.cart .total').html(`Total: $${totalCost}`);
		}