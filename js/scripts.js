var answers={};//dataset atual, em exibição
var githubAnswers={};
var githubAnswers2={};
var listAnswers={};
var current=""
var team = "Both";
var platform = "Both";
var professionally = "Both";


function createBoxesCharts(id){
	c=document.getElementById("container");
	
	//first - colocar um for para os demais gráficos
	var divRow = document.createElement("div");
	divRow.class="row"
	var divChart=document.createElement("div");
	divChart.id=id;
	linne=document.createElement("hr");
	c.appendChild(linne)
	divRow.appendChild(divChart)
	c.appendChild(divRow)
	
}

function alterMinHeight(id,h){
	var div=document.getElementById(id);
	div.style.minHeight = h;
}

function alterHeight(id,w){
	var div=document.getElementById(id);
	div.style.height = w;
}

function clearBox(elementID){    	
	document.getElementById(elementID).innerHTML = "";
	
	}
	
function share(name){
	if(name=="facebook"){
		window.open('http://www.facebook.com/sharer.php?u=https://mobile--survey.herokuapp.com/', '_blank','toolbar=no,menubar=no,resizable=yes,scrollbars=yes,width=500,height=500');
	}else if(name=="twitter"){
		window.open('https://twitter.com/share?url=https://mobile--survey.herokuapp.com/', '_blank','toolbar=no,menubar=no,resizable=yes,scrollbars=yes,width=500,height=500');
	}else if(name=="google+"){
		window.open('http://plus.google.com/share?url=https://mobile--survey.herokuapp.com/', '_blank','toolbar=no,menubar=no,resizable=yes,scrollbars=yes,width=500,height=500');
	}else if(name=="linked"){
		window.open('http://www.linkedin.com/shareArticle?mini=true&url=https://mobile--survey.herokuapp.com/', '_blank','toolbar=no,menubar=no,resizable=yes,scrollbars=yes,width=500,height=500');
	}
}
	

function pieChart(id, t,Series){
	$(function () {
	            $(id).highcharts({
	                chart: {
		                //shadow: true,
	                    plotBackgroundColor: null,
	                    plotBorderWidth: null,
	                    plotShadow: false,
	                    type:"pie"
	                },
	                title: {
		                align:"left",
	                    text: t
	                },
	                //subtitle:{
	                //    text: 'mipagina.com'
	                //},
	                tooltip: {
	                    pointFormat: '{series.name}: {point.y} (<b>{point.percentage:.1f}%</b>)'
	                },
	                plotOptions: {
	                     pie: {
						 	allowPointSelect: true,
						 	cursor: 'pointer',
						 	dataLabels: {
						 		enabled: true,
						 		format: '{point.percentage:.1f} %',
			                    distance: -30,
			                    style: {
			                        fontWeight: 'bold',
			                        color: 'white'
			                    }
			                },
							showInLegend: true
                		}
	                },
	                credits: {
			            enabled: false
			        },
	                series: [{
					         name: 'Amount',
					         colorByPoint: true,
					         data: Series
					        }]
	            });
	        });
}

function pieChartWithDrill(id, t,Series, SeriesDrill){
	$(function () {
	            $(id).highcharts({
	                chart: {
		                //shadow: true,
	                    plotBackgroundColor: null,
	                    plotBorderWidth: null,
	                    plotShadow: false,
	                    type:"pie"
	                },
	                title: {
		                align:"left",
	                    text: t
	                },
	                subtitle: {
		                align:"left",
	                    text:"Click in 'Yes' slice to view the platforms"
	                },
	                //subtitle:{
	                //    text: 'mipagina.com'
	                //},
	                tooltip: {
	                    pointFormat: '{point.y} (<b>{point.percentage:.1f}%</b>)'
	                    
	                },
	                plotOptions: {
	                     pie: {
						 	allowPointSelect: true,
						 	cursor: 'pointer',
						 	dataLabels: {
						 		enabled: true,
						 		format: '{point.percentage:.1f} %',
			                    distance: -30,
			                    style: {
			                        fontWeight: 'bold',
			                        color: 'white'
			                    }
			                },
							showInLegend: true
                		}
	                },
	                credits: {
			            enabled: false
			        },
	                series: [{
					         name: 'Experiences',
					         colorByPoint: true,
					         data: Series
					        }],
					drilldown:{
						
						series:[{
							name: 'Platforms',
			                id: 'Yes',
			                data: SeriesDrill
						
						}]
					}
	            });
	        });
}

function barChart(id,t,Series){
	
	$(function () {
    	$(id).highcharts({

	        title: {
		        align:"left",
	            text: t
	        },
	        chart: {
	                inverted: true,
	                //shadow: true,
	                polar: false
	            },
	        xAxis: {
	            categories: Series["x"]
	        },
	        yAxis: {
	            title: {
	                text: 'Amount'
	            }
	        },
	        tooltip: {
	            pointFormat: 'Amount: <b>{point.y} answers</b>'
	        },
	        credits: {
	            enabled: false
	        },
	
	        series: [{
	            type: 'column',
	            colorByPoint: false,
	            data: Series["y"],
	            showInLegend: false,
	            dataLabels: {
	                enabled: true,
	                color: '#FFFFFF',
	                align: 'right',
	                format: '{point.y}', 
	                //y: 10, // 10 pixels down from the top
	                style: {
	                    fontSize: '12px',
	                    fontFamily: 'Verdana, sans-serif'
	                }
	            }
	        }]

    });
	});
}

function getSeriesTo9and12(Series,id, type){
	//Coloquei 13, mas podeia ser Object.keys(Series).length caso tenham tam diferentes
	id=id.replace("#", "");
	id+=".";//Pega o id e transforma no formato da question na planilha, ex: #9->9. e depois no for fica 9.1 até 9.13
	listResul=[];
	
	for(i=1;i<=Object.keys(Series).length; i++){
		listResul.push(Series[id+i][type]);
	}
	return listResul;
}

function getSeriesToGroupColumnChart(id, Series){
	if(id=="#7"){
		return [{	name: "Bem definido(a)",
					data: getSeriesTo9and12(Series, id,"Bem definido(a)")
				}, {
					name:"Parcialmente definido(a)",
					data:getSeriesTo9and12(Series, id,"Parcialmente definido(a)")
				}, {
					name:"Indefinido(a)",
					data:getSeriesTo9and12(Series, id,"Indefinido(a)")
				}];
	}
	if(id=="#10"){
		return [{	name: "Indiferente",
					data: getSeriesTo9and12(Series, id,"Indiferente")
				}, {
					name:"Pouco influente",
					data:getSeriesTo9and12(Series, id,"Pouco influente")
				}, {
					name:"Moderadamente influente",
					data:getSeriesTo9and12(Series, id,"Moderadamente influente")
				}, {
					name:"Muito influente",
					data:getSeriesTo9and12(Series, id,"Muito influente")
				}, {
					name:"Extremamente influente",
					data:getSeriesTo9and12(Series, id,"Extremamente influente")
				}];
	}
		
}
function getCategoriesTogroupColumnChart(id){
	
	if(id=="#7"){
		return["Eu já tinha uma ideia", "Eu já tinha uma equipe", "Eu já tinha um desafio", "Eu já tinha uma tecnologia"];
	}
	else if(id=="#10"){
		return ["Aspectos Técnicos","Aspectos de Negóci","Aspectos Sociais","Aspectos Pessoais"];
	}
	
}
function getSubTitleToGroupColumnChart(id){
	if (id=="#7"){
		return "";
	}
	if (id=="#10"){
		return "<b>Aspectos Técnicos:</b> linguagem de programação empregada, disponibilidade de ferramentas, tecnologias, etc. <br /><b>Aspectos de Negócios:</b> custo da ferramenta, monetização, aceitação/tendência de mercado, etc.<br /><b>Aspectos Sociais:</b> contatos que conhecem a tecnologia, amigos, professores, disponibilidade de informação nas redes sociais, etc.<br /><b>Aspectos Pessoais:</b> desafio, curiosidade de aprender, superação dos meus limites, etc.";
	}
}
function groupColumnChart(id,t,Series){

	
	$(function () {
		$(id).highcharts({
	        chart: {
		        //shadow: true,
	            type: 'column'
	        },
	        title: {
		        align:"left",
	            text: t
	        },
	        xAxis: {
	            categories: getCategoriesTogroupColumnChart(id),
	            crosshair: true
	        },
	        subtitle: {
		        align:"left",
	            text: getSubTitleToGroupColumnChart(id)           
        	},
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Amount'
	            }
	        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y} </b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.1,
	                borderWidth: 0
	            }
	        },
	        credits: {
			            enabled: false
			        },
	        series: getSeriesToGroupColumnChart(id, Series)
	    });
	});	
}


function getBarStackedCategories(id){
	if(id=="#8"){
		return ["IBM Cloud (Chatbot)", "IBM Cloud (BlockChain)", "IBM Cloud (Outros serviços)", "PowerAI e PowerAI Vision", "Watson", "Node-RED", "DataScience Explorer", "Outra tecnologia"];
	}
	else if (id=="#12"){
		return ["Meetups (antes do evento)", "Website com os desafios", "Canais do Slack", "Mentores", "Juízes", "Apresentações/palestras", "Workshops"];
	}
}
function getSeriesToBarStacked(id, Series){
		if (id=="#8"){
			return [ {
			        name: "Definitivamente Sim",
			        data: getSeriesTo9and12(Series, id,"Definitivamente Sim")
			    }, {
			        name: "Muito provável",
			        data: getSeriesTo9and12(Series, id,"Muito provável")
			    }, {
			        name: "Neutro",
			        data: getSeriesTo9and12(Series, id,"Neutro")
			    }, {
			        name: "Pouco provável",
			        data: getSeriesTo9and12(Series, id,"Pouco provável")
			    }, {
		        name: "Definitivamente Não",
		        data: getSeriesTo9and12(Series, id,"Definitivamente Não")
			    }, {
			        name: "Não conheço",
			        data: getSeriesTo9and12(Series, id,"Não conheço")
			    }]
		}else if(id=="#12"){
			return [ {
			        name: "Extremamente útil",
			        data: getSeriesTo9and12(Series, id,"Extremamente útil")
			    }, {
			        name: "Muito útil",
			        data: getSeriesTo9and12(Series, id,"Muito útil")
			    }, {
			        name: "Moderadamente útil",
			        data: getSeriesTo9and12(Series, id,"Moderadamente útil")
			    }, {
		        name: "Pouco útil",
		        data: getSeriesTo9and12(Series, id,"Pouco útil")
			    }, {
			        name: "Indiferente",
			        data: getSeriesTo9and12(Series, id,"Indiferente")
			    }]
			}
	}
function barStacked(id,t,Series){
	$(function () {
		$(id).highcharts({
		    chart: {
		        type: 'bar'
		    },
		    title: {
		        text: t
		    },
		    xAxis: {
		        categories: getBarStackedCategories(id)
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Amount'
		        }
		    },
		    legend: {
		        reversed: true
		    },
		    plotOptions: {
		        series: {
		            stacking: 'normal'
		        }
		    },
		    series: getSeriesToBarStacked(id, Series)
		});
	});
}


function columnChart(id, t, Series){
	$(function () {
	    $(id).highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
		        align:"left",
	            text: t
	        },
	        xAxis: {
	            type: 'category',
	            labels: {
	                rotation: -45,
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, sans-serif'
	                }
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Amount'
	            }
	        },
	        legend: {
	            enabled: false
	        },
	        tooltip: {
	            pointFormat: 'Amount: <b>{point.y} answers</b>'
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name: 'Population',
	            data:Series,
	            dataLabels: {
	                enabled: true,
	                rotation: -90,
	                color: '#FFFFFF',
	                align: 'right',
	                format: '{point.y}', // one decimal
	                y: 10, // 10 pixels down from the top
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, sans-serif'
	                }
	            }
	        }]
	    });
	});
}
/*
function setSelect(id, valor){
	if(id=="team"){
		if(valor=="---"){
			team="Both";
		}else if(valor=="Yes"){
			team="Yes, I typically develop apps in a team, i.e, with others";
		}else{
			team="No, I typically develop apps by myself";
		}
	}else if(id=="platform"){
		if(valor=="---"){
			platform="Both";
		}else if(valor=="Android"){
			platform="Android";
		}else{
			platform="iOS";
		}
	}else if(id=="professionally"){
		if(valor=="---"){
			professionally="Both";
		}else if(valor=="professionally"){
			professionally="Yes, professionally";
		}else if(valor=="non-professionally"){
			professionally="Yes, non-professionally -- e.g., pet projects, course assignments, ...";
		}else{
			professionally="Yes, I have already contributed to one or more open source projects (irrespective of size)";
		}
		//console.log(professionally);
	}else if(id=="Radio"){
		if(valor=="github"){
			current="GitHub"
			answers=githubAnswers;
		}else if(valor=="list"){
			current="List"
			answers=listAnswers;
		}
		else{
			current="GitHub2"
			answers=githubAnswers2;
		}
	}
	All();
		
}
*/

function filters(linha){
	/*if(team != "Both"){
		if(answers[linha]["3."]==null || answers[linha]["3."]=="" ||answers[linha]["3."]!=team){
			return false;
		}
	}
	
	if(platform != "Both"){
		if(answers[linha]["4."]==null || answers[linha]["4."]=="" || answers[linha]["4."]!=platform){
			return false;
		}
	}
	
	if(professionally != "Both"){
		if(answers[linha]["2."]==null || answers[linha]["2."]=="" || answers[linha]["2."].indexOf(professionally) == -1){
			return false;
		}
	}*/
	
	return true;
}
/*
function question_5(data){
	var Data={"1 app":0,"2 to 5 apps":0, "6 to 10 apps":0,"Over 10 apps":0};
	for (var key in data) {
		if(key==1){
			Data["1 app"]=data[key];
		}else if(key>=2 && key<=5){
			Data["2 to 5 apps"]+=data[key];
		}else if(key>=6 && key<=10){
			Data["6 to 10 apps"]+=data[key];
		}else{
			Data["Over 10 apps"]+=data[key];
		}
	    
	}

	return Data;
}

function question_6(data){
	var Data={"Lass than 1 year":0, "1 to 3 year(s)":0,"]3 to 5 years":0, "Over 5 years":0};
	for (var key in data) {
		if(key>=1 && key<12){
			Data["Lass than 1 year"]+=data[key];
		}else if(key>=12 && key<=36){
			Data["1 to 3 year(s)"]+=data[key];
		}else if(key>=37 && key<=60){
			Data["]3 to 5 years"]+=data[key];
		}else{
			Data["Over 5 years"]+=data[key];
		}
	    
	}

	return Data;
}*/

function getData(column,type){
	var data={};
	if(type=="Pie"){
		for (var i = 0; i < answers.length; i++){
			if(answers[i][column]!=null && answers[i][column]!=""){
				if(filters(i)){
					if(data.hasOwnProperty(answers[i][column])){
						data[answers[i][column]]+=1;
					}else{
						data[answers[i][column]]=1;
					}
				}
			}
	    }
	}else if(type=="Column" || type=="Bar"){
		for (var i = 0; i < answers.length; i++){
			if(answers[i][column]!=null && answers[i][column]!=""){
				if(filters(i)){
					Splits=answers[i][column].split(";");
					for(var j=0;j<Splits.length;j++){
						if(data.hasOwnProperty(Splits[j])){
						data[Splits[j]]+=1;
						}else{
							data[Splits[j]]=1;
						}
					}
				}
				
			}
			
		}
		var others=0;//melhorar depois
		for (var key in data) {
			if(data[key]==1){
				others++;
				delete data[key];
			}
		}
		if (others!=0){
			data["Others"]=others;
		}
		
		
	}else if(type=="groupColumnChart"){
		var dataTemp, columnName;
		if (column=="7."){
			
			for(var i=1;i<=4;i++){
				columnName=column+i;//9.1 ate 9.13 e 12.1 ate 12.13, colunas da planilha
				dataTemp={"Bem definido(a)": 0, "Parcialmente definido(a)":0, "Indefinido(a)": 0};	
				for (var j = 0; j < answers.length; j++){
					if(answers[j][columnName]!=null && answers[j][columnName]!=""){
						if(filters(j)){
							dataTemp[answers[j][columnName]]+=1;
						}
					}
				}
				data[columnName]=dataTemp;
			}
		}else if (column=="8."){
			
			for(var i=1;i<=8;i++){
				columnName=column+i;//9.1 ate 9.13 e 12.1 ate 12.13, colunas da planilha
				dataTemp={"Não conheço":0, "Definitivamente Não": 0, "Pouco provável":0, "Neutro": 0, "Muito provável": 0, "Definitivamente Sim": 0};	
				for (var j = 0; j < answers.length; j++){
					if(answers[j][columnName]!=null && answers[j][columnName]!=""){
						if(filters(j)){
							dataTemp[answers[j][columnName]]+=1;
						}
					}
				}
				data[columnName]=dataTemp;
			}
		}else if (column=="10."){
			
			for(var i=1;i<=4;i++){
				columnName=column+i;//9.1 ate 9.13 e 12.1 ate 12.13, colunas da planilha
				dataTemp={"Indiferente": 0, "Pouco influente":0, "Moderadamente influente": 0, "Muito influente": 0, "Extremamente influente": 0};	
				for (var j = 0; j < answers.length; j++){
					if(answers[j][columnName]!=null && answers[j][columnName]!=""){
						if(filters(j)){
							dataTemp[answers[j][columnName]]+=1;
						}
					}
				}
				data[columnName]=dataTemp;
			}
		}
		else if (column=="12."){
			
			for(var i=1;i<=7;i++){
				columnName=column+i;//9.1 ate 9.13 e 12.1 ate 12.13, colunas da planilha
				dataTemp={"Indiferente": 0, "Pouco útil":0, "Moderadamente útil": 0, "Muito útil": 0, "Extremamente útil": 0};	
				for (var j = 0; j < answers.length; j++){
					if(answers[j][columnName]!=null && answers[j][columnName]!=""){
						if(filters(j)){
							dataTemp[answers[j][columnName]]+=1;
						}
					}
				}
				data[columnName]=dataTemp;
			}
		}
		//console.log(data);
	}
	
	return data;
}

	
function loadData(column, type){
	var Data=getData(column,type);
	var Series=[];
	if(type=="Pie"){//preparar dados para grafico pizza
		var nameKeySliced="";
		var aux=0;
		/*if(column=="5.1"){
			Data=question_5(Data);
		}
		if(column=="6.1"){
			Data=question_6(Data);
		}*/
		for (var key in Data){//guarda a key de maior valor
			if (Data[key]>aux){
				aux=Data[key];
				nameKeySliced=key;
			}
		} 
		for (var key in Data){//cria os dados do grafico
		   if(key==nameKeySliced && column!="7.1" && column!="7.2"){
			   Series.push({
				   name:key,
				   y:Data[key],
				   sliced: true,
		           selected: true
			   });
		   }
		   else{// A questão 7 tem drilldown, por isso é diferente
			  	if(column=="7.1"){
				   if(key=="Yes"){
					   Series.push({"name":key, "y":Data[key], drilldown: key});
				   }
				   else{
					   Series.push({"name":key, "y":Data[key], drilldown: null});
				   }
				}else if (column=="7.2"){
					Series.push([key, Data[key]]);
					
			   	}else{
				   Series.push({"name":key, "y":Data[key]});
			   	}
		   	}
		}
	} else if(type=="Column"){//prepara o grafico de coluna
		Series=[];
		for(var key in Data){
			Series.push([key,Data[key]]);
		}
		
	}else if(type=="Bar"){
		
		var Series={"x":[],"y":[]};
		for(var key in Data){
			Series["x"].push(key);
			Series["y"].push(Data[key]);
		}
		//console.log(Series);
	}else if(type=="groupColumnChart"){
		Series=Data;
		//console.log(Data);
	}
	return Series;
}
/*
function readCsvGithub(check){
	var url = window.location.protocol+"//"+window.location.hostname+window.location.pathname.toString().replace("index.html", "");
	url=url+"Mobile_Survey_GitHub_v4.csv";
	//console.log("link: ", url);testar no localhost trocar url por "https://mobile--survey.herokuapp.com/Mobile_Survey_GitHub_v4.csv"
	Papa.parse(url, {//read github csv
					download: true,
					header: true,
					dynamicTyping: true,
					delimiter:"|",
					complete: function(results) {
						if(check){
							answers = results.data;
							All();
						}
						//console.log("Finished:", results);
				        githubAnswers=results.data;
				      	}	
		    		});
	
}

function readCsvList(check){
	var url_atual = window.location.protocol+"//"+window.location.hostname+window.location.pathname.toString().replace("index.html", "");
	url=url_atual+"Mobile_Survey_Social_Network.csv";
	//console.log("link: ", url) testat no localjost trocar url por "https://mobile--survey.herokuapp.com/Mobile_Survey_Social_Network.csv";
	Papa.parse(url, {//read github csv
					download: true,
					header: true,
					dynamicTyping: true,
					delimiter:"|",
					complete: function(results) {
						if(check){
							answers = results.data;
							All();
						}
				        listAnswers = results.data;
				      	}	
		    		});
	
}

function readCsvGithub2(check){
	var url = window.location.protocol+"//"+window.location.hostname+window.location.pathname.toString().replace("index.html", "");
	url=url+"Mobile_Survey_Follow_up_GitHub.csv";
	//console.log("link: ", url);, depois inserir url abaixo para o deploy
	//testar no local trocar url por "https://mobile--survey.herokuapp.com/Mobile_Survey_Follow_up_GitHub.csv"
	Papa.parse(url, {//read github csv
					download: true,
					header: true,
					dynamicTyping: true,
					delimiter:"|",
					complete: function(results) {
						if(check){
							answers = results.data;
							All();
						}
				        githubAnswers2=results.data;
				      	}	
		    		});
	
}*/

function readCsv(){
	var url = window.location.protocol+"//"+window.location.hostname+window.location.pathname.toString().replace("index.html", "");
	url=url+"Survey_IBM_BlueHack.csv";
	//console.log("link: ", url);testar no localhost trocar url por "https://mobile--survey.herokuapp.com/Mobile_Survey_GitHub_v4.csv"
	Papa.parse(url, {//read github csv
					download: true,
					header: true,
					dynamicTyping: true,
					delimiter:"|",
					complete: function(results) {
						answers = results.data;
						All();
				        
				      	}	
		    		});
	
}

/*
function makeVisibleDatasetOptions(){
	document.getElementById("dataset").style.visibility="visible";
	document.getElementById("formDataset").style.visibility="visible";
}*/

function start(){
	//current="GitHub";
	readCsv();
}

function createTable(id, t){
	 // Create table.
	 
	 
	c=document.getElementById("container");
	linne=document.createElement("hr");
	c.appendChild(linne)
	
	
	var title = document.createElement('h4');
	title.innerHTML = t;
	c.appendChild(title); 
	
	var divRow = document.createElement("div");
	divRow.class="row"
	var divChart=document.createElement("div");
	divChart.id=id;
	divChart.style.width="100%";
    divChart.style.height="300px";
    divChart.style.overflow= "auto"
	
	divRow.appendChild(divChart)
	c.appendChild(divRow) 
	 
	 
	
	
    var table = document.createElement('table');
    table.style.width="100%";
    empty=0;
    // Insert New Row for table at index 'i'.
    for (i=0;i<Object.keys(answers).length;i++){
		    if(answers[i][id+"."]!=null && answers[i][id+"."]!="" && answers[i][id+"."]!=" "){
			    var row = table.insertRow(i-empty);
			    
			    if (((i+1-empty)%2)===0){
			    	row.bgColor="#DCDCDC";
			    }
			    else{
				    row.bgColor="#F5F5F5";
			    }
			    
				var rowcol1 = row.insertCell(0);
				rowcol1.style.paddingTop="6px";
				rowcol1.style.paddingBottom="6px";
				rowcol1.innerHTML = answers[i][id+"."];
			}else{
				empty++;
			}
		
    }
    
    divChart.appendChild(table);
}

function All(){
	//primeiro ler os dados todos
	var Series, Series_drilldown;
	
	clearBox("container");
	createBoxesCharts("1");//cria  div html com o id 1
	alterHeight("1","300px")
	Series=loadData("1.", "Pie");
	pieChart("#1","1 - Qual a sua faixa etária?", Series);
	
	createBoxesCharts("2");//cria  div html com o id 1
	alterHeight("2","300px")
	Series=loadData("2.", "Bar");
	barChart("#2","2 - Em qual área você atua?", Series);
	
	createTable("3",  "3 - Qual é a sua principal atividade? Se for estudante, em qual instituição/curso?")
	
	createBoxesCharts("4");//cria  div html com o id 1
	alterHeight("4","300px")
	Series=loadData("4.", "Pie");
	pieChart("#4","4 - Indique o seu tempo de experiência na sua atividade relatada na questão anterior", Series);
	
	createBoxesCharts("5");//cria  div html com o id 1
	alterHeight("5","300px")
	Series=loadData("5.", "Pie");
	pieChart("#5","5 - Você já participou de algum hackathon antes?", Series);
	
	createTable("6",  "6 - O que lhe motivou a participar do Blue|Hack 2017?");
	
	createBoxesCharts("7");//cria  div html com o id 1
	alterHeight("7","400px")
	Series=loadData("7.", "groupColumnChart");
	groupColumnChart("#7","7 - Você se preparou para o Blue|Hack 2017?", Series);
	
	createBoxesCharts("8");//cria  div html com o id 1
	alterHeight("8","450px")
	Series=loadData("8.", "groupColumnChart");
	barStacked("#8","8 - Agora que o Blue|Hack terminou, você pretende utilizar alguma das tecnologias que foram apresentadas durante o mesmo?", Series);

	createTable("9",  "9 - Conte-nos mais sobre a sua resposta anterior. Como você pretende utilizar a(s) tecnologia(s) acima?");


	createBoxesCharts("10");//cria  div html com o id 1
	alterHeight("10","500px")
	Series=loadData("10.", "groupColumnChart");
	groupColumnChart("#10","10 - Em que medida os aspectos abaixo influenciam você a utilizar as tecnologias selecionadas nas perguntas anteriores?", Series);
	
	createTable("11",  "11 - Você pode nos dar mais detalhes sobre a sua resposta anterior?");
	
	createBoxesCharts("12");//cria  div html com o id 1
	alterHeight("12","450px")
	Series=loadData("12.", "groupColumnChart");
	barStacked("#12","12 - A organização do Blue|Hack 2017 disponibilizou vários recursos antes e durante o evento. Quão úteis foram estes recursos pra você?", Series);
	
	createTable("13",  "13 - Por favor, explique a sua resposta anterior");
	
	createBoxesCharts("14");//cria  div html com o id 1
	alterHeight("14","450px")
	Series=loadData("14.", "Bar");
	barChart("#14","14 - Em sua opinião, qual foi o ponto alto do Blue|Hack 2017? Marque no máximo 3 respostas.", Series);

	createTable("15",  "15 - Você pretende participar de outro Blue|Hack no futuro?");

	createBoxesCharts("16");//cria  div html com o id 1
	alterHeight("16","300px")
	Series=loadData("16.", "Pie");
	pieChart("#16","16 - Dê uma nota geral para o Blue|Hack 2017.", Series);
	
	createTable("17",  "17 - Por favor, explique sua resposta anterior. O que foi bom e o que foi ruim?");
	
	}