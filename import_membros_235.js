const fs = require('fs');

const data = `Anjos, Pamela dos	F	40	24 jun 1986	(11) 95427-0105	pamelaanjossp@gmail.com
Arcanjo Teles, Augusto Henrique	M	16	20 set 2009	(11) 99307-5210	
Arcanjo Teles, Rafael Augusto	F	12	15 dez 2013	(11) 99307-5210	
Arcanjo Teles, Rodrigo Augusto	M	13	6 ago 2012	(11) 99307-5210	
Atahuachi Ortiz, Jennifer Lucia	F	15	20 jun 2011	(11) 99490-0655	
Atahuachi Ortiz, Leonela Mayrin	F	18	5 fev 2008	(11) 99490-0655	leonela5208@gmail.com
Barbosa, Cleonice Lopez	F	54	26 fev 1972	(11) 96718-8791	
Barbosa, Iara Maria	F	50	8 mai 1976	(11) 97227-0536	iara.san@hotmail.com
Barbosa, Murilo Guilherme	M	27	5 dez 1998	(11) 94996-6270	murilo.g.barbosa98@gmail.com
Barbosa, Rosenilda	F	60	2 dez 1965	(11) 95363-3872	rosebcamara45@gmail.com
Barros, Ana Carolina Pereira de	F	6	5 jan 2020		
Barros, Guilherme Pereira de	M	16	3 mai 2010	(11) 95455-4932	gui.barros.sud@gmail.com
Barros, Matheus Pereira de	M	13	21 fev 2013		matheus.barros.sud@gmail.com
Barros, Rogério Pereira de	M	53	4 dez 1972	(11) 98170-3888	barros.gmwr@gmail.com
Barros, Wanderli Pereira de	F	55	17 jun 1971	(11) 95460-6293	wgr.barros@gmail.com
Bento Silva Costa, Giovanna	F	26	21 mar 2000	(11) 94138-0220	giovanna.boot@gmail.com
Bento, Rony	M	34	1 nov 1991	(11) 94963-7507	roni_davi@hotmail.com
Bracho Ledezma, Jeremias Joel	M	13	4 set 2012	(42) 4963-1983	jeremiasbracho2012@gmail.com
Bracho Ledezma, Johana Magdalena de	F	44	5 nov 1981	(11) 97624-9667	johanaledezma3.5@gmail.com
Bracho Ledezma, Leslie Valentina	F	19	3 mai 2007	(11) 93365-4147	blesly838@gmail.com
Bracho Ledezma, Xiara Clarisa	F	12	21 jan 2014		
Bracho Montilva, Henry Alfonzo	M	72	4 dez 1953	(41) 4397-0483	bracholuisa1090@gmail.com
Bracho Nieto, Hinder Brando	M	50	28 ago 1975	(11) 99861-8745	hinderb.bracho@gmail.com
Bracho Nieto, Luisa Andreina	F	35	10 nov 1990	(42) 4211-2705	bracholuisa1090@gmail.com
Bracho Nieto, Maria Luisa De	F	76	20 dez 1949	(11) 95315-0080	
Brito Castillo, Emilis Josefina	F	33	15 set 1992	4161879670	britocastilloemilis@gmail.com
Bronze, Carmen Trugilo Marques	F	77	21 jul 1948		
Bronze, Mathias Marques	M	88	27 fev 1938	2956-3889	
Calderón Garcia, Henry Oscar	M	49	1 out 1976	(11) 98860-5939	henrycalderon001@gmail.com
Calderón Machado, Aitor Dreiger	M	9	4 jan 2017		
Calderón Machado, Dylan Janesky	M	18	17 set 2007		dylanjanesky65@gmail.com
Cardoso, Alan C Francisco	M	31	27 jul 1994	(11) 96334-2198	alankcardoso@gmail.com
Cardoso, Arthur Batista	M	21	12 jul 2005		tutu.batista@outlook.com
Cardoso, Maria Celia Batista	F	55	10 set 1970	(11) 94019-0220	remmencardoso@hotmail.com
Cardoso, Maria Laura Batista	F	21	12 jul 2005		maribatista@outlook.com
Cardoso, Remmen Aparecido	M	53	22 mai 1973	(11) 98796-3598	remmencardoso@hotmail.com
Carias Carias, Danny Rafael	M	41	10 jul 1985		dannycarias1985@gmail.com
Carias Vallez, Brianna Gabriela	F	3	17 set 2022	(11) 93002-9898	Kherlys88@gmail.com
Carias Vallez, Gian Lucca Rafael	M	6	23 mai 2020		
Carpio de Maurera, Rosalinda	F	33	22 mar 1993	(42) 4971-9041	rossicarpio@gmail.com
Carrasco Ramírez, Yarlyn José	M	37	31 ago 1988	(11) 95908-3585	yalitox@gmail.com
Carreño Ditta, Elvira	F	75	28 fev 1951	(11) 99570-1356	cherry5466@gmail.com
Carreño Machado, Yohana Marbella	F	47	15 jun 1979		yohanamachado79@gmail.com
Carvalho, Yasmim Gomes	F	27	21 fev 1999		
Cecilia, Rodrigues Rios	F	2	4 set 2023		
Cleto De Sousa, Leonardo	M	9	7 set 2016	(11) 94255-5660	
Colón Machado, Javier Antonio	M	22	12 abr 2004	4265916408	Javiercitocolon5@gmail.com
Cordeiro, Bruno dos Santos	M	41	28 nov 1984	97011-1555	bsc_bruno@yahoo.com.br
Correa Machado, Anyelina Yolieth	F	18	1 nov 2007	(42) 4970-8421	anyelinacorrea07@gmail.com
Correa Machado, Jose Anyer	M	23	12 jan 2003		joseanyercorrea15@gmail.com
Costa Filho, Edison Almeida	M	41	30 out 1984	(11) 94453-6426	edison.kaji@hotmail.com
Costa, Glaucia Soares Da	F	40	5 jul 1986	(11) 94453-6426	glaucia_soarescosta@yahoo.com.br
Costa, Leonardo Soares	M	17	10 fev 2009		leonardosoarescosta83@gmail.com
Costa, Rodrigo Soares	M	19	19 mai 2007	(11) 94498-5464	edison.kaji84@gmail.com
Cruz, Katia Regina Da	F	55	9 jul 1971		
Cunha, Almerinda Pereira	F	85	2 ago 1940	2052-4945	
Cunha, Regina Pereira	F	52	6 fev 1974		
Da Silva Borrero, Flavio	M	50	2 jun 1976	(11) 97111-5822	Flavioborrero@gmail.com
da Silva, Vicente Caitano	M	63	20 dez 1962	(11) 95496-8009	vicentecaitanodasilva740@gmail.com
De Freitas, Deberson	M	52	29 jan 1974	(11) 96150-3871	sandlj2026@gmail.com
de Lima, Elisabete da Silva Santos	F	59	6 jan 1967	(11) 96510-1414	Elisa.0300@hotmail.com
de Lima, Emanuela Núria Moreira	F	13	5 out 2012	(11) 98398-2114	fabriciolima4924@gmail.com
De Melo, Nicole	F	27	27 jul 1998	(11) 99100-4390	nicoledemeloa@outlook.com
dos Santos, Claryssa Geovana Rodrigues	F	17	11 out 2008	(11) 98398-2114	claryssamoreira656@gmail.com
dos Santos, Ivonete da Silva Pereira	F	67	11 mar 1959	96582-0124	
Dos Santos, Luiz Carlos De Lima	M	39	9 dez 1986	(54) 3310-1733	consultor.independente10@gmail.com
Dos santos, Marvin Lucca	M	7	12 out 2018		
Dos Santos, Paulo Henrique	M	16	24 mai 2010	(11) 95404-2343	mariajosedossantospereira30@gmail.com
Farias, Elizabeth Tatiane Rosa	F	45	19 set 1980	(11) 2052-7567	
Ferreira Martins, Nathan	M	25	30 nov 2000	(11) 94023-8752	nathanmartins3011@gmail.com
Fonseca, Sandra Luciane Figueiredo Da	F	49	3 jun 1977	(11) 91424-0912	sandra-figuei@hotmail.com
Froes, Saada Khaled Thome	F	74	13 nov 1951		
Gabriel, Jorge Pinoca Gonçalves	M	31	11 out 1994	939 917 559	
Gama, Ana Clara dos Anjos	F	19	23 mar 2007	(11) 96846-1227	pamelaanjossp@gmail.com
García Fernández, Elena del Valle	F	57	26 set 1968	9581123273	elenagarciafer3@gmail.com
Gomes Alves Pereira, Nicolly	F	14	15 abr 2012	(11) 95488-4998	nickgomesalves1504@gmail.com
Herrera Pinaicobo, Juan	M	20	31 mai 2006	69244017	juanherrerapinaicobo@gmail.com
Herrera Pinaicobo, Wisley	M	26	1 jun 2000	(11) 97642-0973	lasolteriaesmejor@gmail.com
Isaac mahonri, Ribera Cardoso	M	0	4 jan 2026		
Jaquinta, Elaine Santiago	F	41	13 out 1984	99455-3524	elaine_santiago10@hotmail.com
Jesus Junior, José Roberto de	M	44	24 ago 1981	2544-0809	
Jesus, Roberto Junior Teixeira de	M	15	22 jun 2011		
Laranjeira, Francisco Fernandes	M	59	6 mar 1967	(11) 94167-1242	
Lima, Efraim Batista de	M	57	19 set 1968	94619-0559	efraimlima80@hotmail.com
Lima, Fabricio Jose de	M	41	29 abr 1985	(11) 98398-2114	fabriciolima4924@gmail.com
Lima, Maria Viana de Oliveira	F	65	18 dez 1960	(11) 95452-4023	mariavianaoliveira1960@gmail.com
Lima, Matheus Oliveira de	M	26	12 mai 2000	(11) 96145-3620	
Lima, Nicolas Davi Moreira de	M	6	16 dez 2019	(11) 98398-2114	
Lima, Stephany de Oliveira	F	28	18 set 1997		
Lobato, Rosangela Gomes	F	53	18 jul 1972	(11) 2521-5060	
Lopes, Alexandre	M	56	23 fev 1970	(11) 95891-2883	
Lopes, Thiago Ferreira	M	37	28 mar 1989	98959-0370	thiagoferreiralopes@ymail.com
Lucca dos santos	M	7	12 out 2018		
Machado Carreño, Cherry Wilmer	M	54	20 mar 1972	(11) 95428-3340	cherry5467@gmail.com
Machado carreño, Yadira Jenith	F	57	27 jan 1969	4269949615	yadimachado27@gmail.com
Machado de Calderón, Yublithze Yurmailin	F	49	27 jan 1977		yublithze@hotmail.com
Maciel, Antonio Afonso	M	75	3 nov 1950	1169569426	
Maciel, Elisete Carvalho	F	72	15 set 1953	1169569426	
Maciel, Rochely Carvalho	F	51	1 jul 1975		
Magnavita, Gustavo Silva Lopes	M	17	14 ago 2008	(11) 2053-1634	gustavomagnavita7@gmail.com
Magnavita, Leandro Lopes de Souza	M	45	4 fev 1981		lopesdesouzajosefa@gmail.com
Magnavita, Rafael Lopes de Souza	M	40	14 abr 1986		rafael.piloto.vip@gmail.com
Magnavita, Rodrigo Lopes de Souza	M	40	14 abr 1986		
Malvão, Mariana Tenório Cavalcante	F	34	8 ago 1991	(11) 94802-5866	mtenorio691@gmail.com
Martins, Vitória Ferreira	F	28	20 abr 1998	(11) 99932-3099	ferreiravtr@gmail.com
Maurera Carpio, Christian Gael	M	7	10 dez 2018		
Maurera Martinez, Kevin Alexander	M	34	6 set 1991	(11) 98701-8939	kmaurera04@gmail.com
Maurera Martinez, Leisve Beatriz	F	39	2 set 1986	(11) 99313-9887	leisvemaureral@gmail.com
Maurera Martinez, Matthew Javier	M	23	28 mar 2003	(11) 95120-3973	mmatthewjavier@gmail.com
Maurera, Ian Enrrique Carrasco	M	8	12 set 2017	(42) 4905-3569	yalitox@gmail.com
Mendoza, Leonardo Junior Gonzales	M	48	19 mai 1978	(11) 98955-3812	desenvolvimento3000@outlook.com
Miranda, Beatriz Victoria dos Anjos	F	24	27 mai 2002	(11) 98131-1609	beatrizanjosmiranda.lds.sud@gmail.com
Monteiro, Ulisses	M	79	9 set 1946	(11) 2053-7659	ulissesmonteiro19@gmail.com
Morais, Heloísa Santiago	F	12	25 dez 2013	(11) 99751-2831	rodrigo_amorais@hotmail.com
Morais, Rodrigo Afonso de	M	40	27 mar 1986	(11) 99751-2831	rodrigo_amorais@hotmail.com
Moreira, Jeiza dos Santos	F	34	28 mar 1992	(11) 95280-2772	jeizalima92@gmail.com
Mota De Freitas, Guilherme	M	26	10 set 1999	(11) 91509-7304	guimotafreitas@gmail.com
Müller Junior, Emerson	M	26	26 dez 1999	(11) 98770-2580	ignus8incubus@outlook.com
Narciso, Jeshus Ricardo	M	67	17 mar 1959	(11) 96465-2924	
Nascimento, Reynan Vitor Santos do	M	27	16 fev 1999		reynan888rv@hotmail.com
Neres Francelino, Alvaro	M	20	1 jul 2006		alvaroneres002@gmail.com
Ojeda, Isabella de Oliveira	F	24	5 set 2001	(11) 2514-2446	oisabella365@gmail.com
Oliveira, Barbara Edite Miola Gonçalves de	F	67	31 ago 1958	96294-9025	barbaramiola@hotmail.com
Oliveira, Bruna	F	31	10 jul 1995	(11) 99102-0780	brunaaah13@gmail.com
Oliveira, Elaine Da Silva	F	47	11 jul 1979	2053-2693	
Oliveira, Jose Marcos Gonçalves de	M	54	9 jun 1972	(11) 94564-7954	jmg.deoliveira92@gmail.com
Oliveira, Karina de	F	33	19 nov 1992	97758-1520	karinaoliveira177@gmail.com
Oliveira, Marcelo Ferreira de	M	54	11 jun 1972	1161543518	
Oliveira, Maria Rodrigues de	F	43	28 mai 1983	(11) 96548-8648	
Oliveira, Marta Rodrigues de	F	24	28 ago 2001		
Oliveira, Mateus Rodrigues de	M	24	28 ago 2001	(11) 96887-9465	
Oliveira, Stefanie Da Silva	F	29	8 fev 1997		
Ortiz Velez, Anabel	F	34	29 dez 1991	(11) 96595-4138	ortizvelezanabel0@gmail.com
Pachuri Velez, Romina	F	14	14 jan 2012	(11) 97876-5007	
Pachuri Velez, Valéria	F	12	4 nov 2013		
Paula Velasquez Gonzalez, Silvana	F	22	18 jul 2003	(11) 97840-7900	
Pereira da Silva, Alisson	M	34	22 nov 1991	(11) 94070-1590	alyssonstronda@gmail.com
Pereira, Jessica	F	33	13 nov 1992	95207-3145	jessica_mcp@hotmail.com
Pincerno, Almir	M	64	16 ago 1961	2054-1960	brancopincerno@gmail.com
Pincerno, Camila	F	37	30 abr 1989		millapincerno@gmail.com
Pincerno, Marilia Sarai Dos Santos	F	38	15 jan 1988		
Pincerno, Silvia Aparecida dos Santos	F	61	23 jun 1965	96302-7742	pincernosilvia@gmail.com
Pindaiba, Rosa Luzia Cavalcante	F	59	11 nov 1966	(11) 96483-5673	rosaluzzia@hotmail.com
Pinto, Paula Cristina Nascimento	F	50	14 dez 1975	124721740	
Raimundo, Ana Alves	F	73	9 jan 1953	(11) 2053-9549	
Raimundo, Jussara Alves	F	32	4 fev 1994		
Rangel, Ronaldo Romero Soares	M	68	24 mar 1958	(11) 94715-7609	
Ribeiro Dias, Douglas	M	46	30 out 1979	(15) 99770-1641	
Ribeiro, Davi de Carvalho	M	13	6 fev 2013		davicheiroso3@gmail.com
Ribeiro, Ligia de Jesus	F	76	8 jun 1950	(11) 2052-1594	
Ribeiro, Lucilene de Carvalho	F	48	23 jul 1977	(11) 98115-8738	carvalho.lucilene3@gmail.com
Ribeiro, Rogerio da Conceição	M	50	26 jul 1975	(11) 96019-4854	rogeriogueribeiro7@gmail.com
Ribeiro, Sophia de Carvalho	F	20	3 abr 2006		sophia.ribeiro.177@gmail.com
Ribera CARDOSO, Angela	F	36	27 jan 1990	(11) 99160-3723	angelasuribera@gmail.com
Rincón Maurera, Jonathan Mosíah	M	17	21 jul 2008	(11) 95956-0584	leisvemaurera@gmail.com
Rios, Gilberlan Dos Santos	M	28	27 fev 1998	(11) 95297-9688	Gilzinhosantos50@gmail.com
Ritter, Dorival Mellato	M	64	13 jan 1962	(11) 95765-3763	Dorivalmellatoritter@gmail.com
Ritter, Sandra de Paula Moraes	F	60	16 out 1965	96151-8905	sandrapmritter@gmail.com
Rodrigues, Alessandra Gonçalo Paz	F	52	10 nov 1973	(11) 2862-2905	ale_gpr@yahoo.com.br
Rodrigues, Camila Cavalcante	F	30	10 jul 1996		kh.amy@hotmail.com
Rodrigues, Cintia Raimundo	F	25	26 set 2000	94644-9096	Rcintia20@gmail.com
Rodrigues, Nilson Aparecido	M	53	21 nov 1972	98034-3033	nilsonmail@hotmail.com
Rodrigues, Vanessa Cavalcante	F	24	20 jul 2001		
Rogerio, Adriana de Campos	F	56	10 dez 1969	1162974935	
Rogerio, Eunice Campos	F	43	16 jun 1983	(11) 2031-2285	
Ruiz, Raimelys Gabriela Carias	F	19	15 dez 2006	(95) 98425-5849	raimelyscarias@gmail.com
Russo, Maria Izabelly Lima	F	15	29 mar 2011	(11) 91505-7613	
Sabino, Henrique Alves	M	15	27 out 2010	(11) 95493-2402	
Santana, Edie Monique Moreira	F	46	5 abr 1980	(11) 95362-4147	
Santos, Alcina Maria Da Silva	F	89	13 mar 1937	2051-2135	ygor_slima@outlook.com
Santos, Aline Rodrigues dos	F	26	11 fev 2000	(11) 95119-4938	alinerodriguessantos123@gmail.com
Santos, Clayton Trindade dos	M	30	6 out 1995	1161541899	
Santos, Douglas Maques dos	M	25	11 out 2000		
Santos, Edileusa Cardoso Rodrigues	F	57	28 jan 1969	(11) 2051-2128	
Santos, Elias Cardoso Da Silva	M	56	13 ago 1969	(11) 2054-1866	
Santos, Elisete Da Silva	F	62	13 ago 1963		
Santos, Júlia Rodrigues dos	F	21	16 jan 2005	2053-2780	juliarodriguesdossantos02@gmail.com
Santos, Marcelo Dos	M	56	14 dez 1969	(11) 2057-2979	
Santos, Nadir Da Silva	F	53	13 set 1972	2051-2135	nadirdasilvasantos8@gmail.com
Santos, Olívia Barbosa	F	7	30 nov 2018		
Santos, Vera Lucia Pereira Dos	F	65	8 abr 1961	2052-4606	
Santos, Yanne Kamila Barbosa Dos	F	37	27 mar 1989	(11) 95204-5307	yanne_barbosa@hotmail.com
Santos, Yasmin Barbosa	F	13	12 jun 2013	(11) 95204-5307	yanne_barbosa@hotmail.com
Santos, Ygor Marques dos	M	21	10 out 2004		
Sato, Maria Jussara Santana	F	68	10 out 1957	(11) 99776-2343	
Sato, Rodrigo Santana	M	45	5 jul 1981		
Sebastian Añez Subirana, Rayan	M	11	11 jun 2015		
Silva Freitas, William	M	13	12 out 2012	(17) 99223-3405	
Silva, Andrew Oliveira Da	M	25	19 abr 2001	(11) 2051-8772	andrewoliveiraesilva@gmail.com
Silva, Beatriz Camilla Morais da	F	32	26 mai 1994	(11) 95088-3617	beatrizcamillamorais@gmail.com
Silva, Cícera Maria da	F	68	20 mar 1958	(11) 2053-2647	ciceramaria059@gmail.com
Silva, Cristiane Araujo da	F	49	27 nov 1976	(11) 97744-9176	CRIS.RADICA@HOTMAIL.COM
Silva, Daniel Rony Farias	M	24	18 abr 2002	2052-7567	daniel.ronyfarias@gmail.com
Silva, Elenice Da	F	56	31 jul 1969		
Silva, Geraldo Jose da	M	64	8 fev 1962	(11) 2052-7567	
Silva, Joose Marilian	F	38	10 abr 1988	(17) 99223-3405	joosemarilian@yahoo.com.br
Silva, Jose Edson Da	M	43	22 dez 1982	2053-5671	
Silva, Josefa Alberto	F	76	29 nov 1949	(11) 2031-1533	
Silva, Julia Hagata Lopes da	F	17	27 mar 2009		
Silva, Julya Farias	F	21	17 ago 2004	(11) 2052-7567	tati.farias@gmail.com
Silva, Laércio Alberto Da	M	51	25 fev 1975	95719-4603	
Silva, Luzia Marcos Ferreira	F	61	10 nov 1964	94796-7686	luziamfsilva@gmail.com
Silva, Maria Soares Da	F	64	20 ago 1961		
Silva, Miguel Alexandre de Morais	M	8	25 abr 2018		msilva.miguel@icloud.com
Silva, Patricio Aparecido Da	M	47	31 jul 1978	(11) 2031-5602	
Silva, Renata Santiago Batista Da	F	22	27 out 2003	2385-5739	renatasantiago2003@hotmail.com
Silva, Viviane Santos Da	F	36	30 nov 1989		
Silva, Wellington Antônio da	M	30	18 set 1995	(11) 94874-4523	was1809@gmail.com
Silva, Yasmin Edvirgem da	F	28	29 set 1997		
Sousa, Adriano Cleto de	M	47	15 dez 1978	(11) 98489-1060	
Sousa, Leticia Cleto de	F	18	18 jun 2008		ls8471650@gmail.com
Sousa, Lucas Cleto de	M	21	1 out 2004		lucass.jgg@gmail.com
Sousa, Silvia de Lourdes	F	44	4 fev 1982	94255-5660	silvia-lourdes@hotmail.com
Souza, Allan Gregory Bezerra de	M	36	13 set 1989	95271-2820	A.GREGORY@BOL.COM.BR
Souza, André Luiz Alves de	M	59	6 mar 1967	(11) 94150-7316	andresouza51192@gmail.com
Souza, Daniella Lopes Alves de	F	33	14 ago 1992	(11) 94248-5001	
Souza, Esther Cecim Pinto	F	29	17 dez 1996		
Souza, Helder Mariano Paes de	M	57	1 ago 1968	(11) 96031-1887	hmpsud@gmail.com
Souza, Josefa Lopes de	F	67	19 mar 1959	(11) 96550-5839	lopesdesouzajosefa@gmail.com
Souza, Madeline Cecim Pinto de	F	53	24 jan 1973		
Souza, Sarah Cecim Pinto de	F	20	25 jul 2005		
Souza, Terezinha da Silva	F	86	27 mai 1940	98230-8244	
Teixeira, Arthur de Oliveira	M	8	19 mar 2018		
Teixeira, José Silva	M	67	5 ago 1958	(11) 95718-8576	teixeirajt58@gmail.com
Teixeira, Lucas de Oliveira	M	6	1 nov 2019	(11) 95211-5186	
Teixeira, Maria Eunice Alves	F	59	27 mai 1967	(11) 95718-8576	euniceateixeira@hotmail.com
Teixeira, Miriam Alves	F	40	10 out 1985	(11) 98069-1802	miriamateixeiradejesus@gmail.com
Teixeira, Murilo Alves	M	36	22 jun 1990	95211-5186	muriloat3@gmail.com
Valentim Ferreira, dos Santos	M	6	19 jan 2020		
Valles Brito, Franchesco Breidy	M	8	28 fev 2018		
Vallez de Carias, Kherlly katherine	F	30	29 fev 1996		Kherlys88@gmail.com
Vallez Machado, Henrry Antonio	M	32	5 abr 1994	4266966799	
Vieira, Gerlane da Silva	F	39	9 mai 1987	(11) 99881-4428	gerlane_gi@yahoo.com.br
Vieira, Jonathan da Silva	M	10	16 set 2015		
Villagomez Lijeron, Alexander	M	37	30 out 1988	(11) 91330-5220	Ortizvelezanabel0@gmail.com`;

const meses = {
  'jan': '01', 'fev': '02', 'mar': '03', 'abr': '04', 'mai': '05', 'jun': '06',
  'jul': '07', 'ago': '08', 'set': '09', 'out': '10', 'nov': '11', 'dez': '12'
};

function main() {
  const lines = data.split('\n');
  let sql = 'INSERT INTO "Membro" ("nome", "sexo", "idade", "dataNascimento", "telefone", "email", "status", "updatedAt") VALUES\n';
  let values = [];

  for (const line of lines) {
    if (!line.trim() || line.startsWith('Contagem') || line.startsWith('Não Batizado')) continue;
    
    const parts = line.split('\t');
    if(parts.length < 3) continue;

    const nomeOriginal = parts[0].trim();
    let nome = nomeOriginal;
    if (nomeOriginal.includes(',')) {
      const [sobrenome, primeiroNome] = nomeOriginal.split(',');
      nome = `${primeiroNome.trim()} ${sobrenome.trim()}`;
    }

    const sexo = parts[1] ? parts[1].trim() : 'M';
    const idade = parseInt(parts[2]) || 'NULL';
    
    const dataString = parts[3] ? parts[3].trim() : '';
    let dataNascimento = 'NULL';
    if (dataString) {
      const dParts = dataString.split(' ');
      if (dParts.length === 3) {
        const dia = dParts[0].padStart(2, '0');
        const mes = meses[dParts[1].toLowerCase()] || '01';
        const ano = dParts[2];
        dataNascimento = `'${ano}-${mes}-${dia}T12:00:00Z'`;
      }
    }

    let telefone = parts[4] ? parts[4].replace(/\D/g, '') : 'NULL';
    if (telefone !== 'NULL' && telefone.length > 0) {
      if (!telefone.startsWith('55')) {
        telefone = '55' + telefone;
      }
      telefone = `'${telefone}'`;
    }
    
    let email = parts[5] ? `'${parts[5].trim()}'` : 'NULL';

    values.push(`('${nome.replace(/'/g, "''")}', '${sexo}', ${idade}, ${dataNascimento}, ${telefone}, ${email}, 'Ativo', NOW())`);
  }
  
  sql += values.join(',\n') + ';';
  fs.writeFileSync('insert.sql', sql);
  console.log('SQL generated!');
}

main();
