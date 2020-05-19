<div>
	<!--<form role="form" class="connectannouncements_topic_frm">-->
    <!--<div>-->
      <!--<label for="label_dataInizio">Data Inizio</label>-->
      <!--<input type="date" name="date_start" id="date_start" value="{connectannouncementsData.date_start}">-->
      <!--<label for="label_dataFine">Data Fine</label>-->
      <!--<input type="date" name="date_end" id="date_end" value="{connectannouncementsData.date_end}">-->
    <!--</div>-->
    <!--<hr />-->
		<!--<div>-->
      <!--<div class="text-center"><button type="button" class="selectAll btn btn-xs btn-primary">Seleziona Tutti</button> <button type="button" class="deselectAll btn btn-xs btn-primary">Deseleziona Tutti</button></div>-->
      <!--<hr />-->
      <!--<ul class="connect-announcement-categories-list row">-->
        <!--&lt;!&ndash; BEGIN connectannouncementsData.categories &ndash;&gt;-->
        <!--<li class="col-md-4">-->
          <!--<input type="checkbox" id="connectannouncements_categories_{connectannouncementsData.categories.cid}" name="connectannouncements_categories" value="{connectannouncementsData.categories.cid}" &lt;!&ndash; IF connectannouncementsData.categories.announcement &ndash;&gt;checked&lt;!&ndash; ENDIF connectannouncementsData.categories.announcement &ndash;&gt; />-->
          <!--<label for="connectannouncements_categories_{connectannouncementsData.categories.cid}">{connectannouncementsData.categories.name}</label>-->
        <!--</li>-->
        <!--&lt;!&ndash; END connectannouncementsData.categories &ndash;&gt;-->
      <!--</ul>-->
    <!--</div>-->
	<!--</form>-->

	<!--"others":{-->
	<!--"product":"Casicyber Dev (Monolithic)",-->
	<!--"version":"1.0.0",-->
	<!--"apartment":"创新（技术）研究中心",-->
	<!--"project":"容器云",-->
	<!--"question_type":"应用问题",-->
	<!--"answer":"llll",-->
	<!--"degree":"★",-->
	<!--"environment":"mac",-->
	<!--"contact":"12",-->
	<!--"contact_way":"12345677"-->
	<div class="products item">
		<label class="biaoti">应用平台产品:</label>
		<span>{others.product}</span>
	</div>


	<!-- 产品版本 -->

	<div class="versions item">
		<label class="biaoti">产品版本:</label>
		<span>{others.version}</span>
	</div>


	<!-- 问题类型 -->
	<div class="question_types item">
		<label class="biaoti">问题类型:</label>
		<span>{others.question_type}</span>
	</div>

	<!-- 所属事业部-->
	<div class="apartments item">
		<label class="biaoti">所属事业部:</label>
		<span>{others.apartment}</span>
	</div>

	<!-- 所属项目-->

	<div class="projects item">
		<label class="biaoti">所属项目:</label>
		<span>{others.project}</span>
	</div>
	<!--&lt;!&ndash; 邀请回答人&ndash;&gt;-->

	<!--<div class="answers item">-->
		<!--<label class="biaoti">邀请回答人</label>-->
		<!--<div class="block">-->
			<!--<select class="xuanxiang" name="answer" lay-verify="required">-->
				<!--<option value="0">llll</option>-->
				<!--&lt;!&ndash; <option value="1">用户一</option>-->
                <!--<option value="2">用户一</option>-->
                <!--<option value="3">用户一</option> &ndash;&gt;-->
			<!--</select>-->
		<!--</div>-->
	<!--</div>-->
	<!-- 运行环境 -->

	<div class="environment item">
		<label class="biaoti">运行环境:</label>
		<span>{others.environment}</span>
	</div>
	<!-- 急切程度 -->

	<div class="degree item">
		<label class="biaoti">急切程度:</label>
		<span>{others.degree}</span>
	</div>
	<!-- 联系人 -->

	<div class="contact item">
		<label class="biaoti"> 联系人:</label>
		<!--不能有空格-->
		<span>{others.contact}</span>
	</div>

	<!-- 联系方式 -->

	<div class="contact_way item">
		<label class="biaoti"> 联系方式:</label>
		<span>{others.contact_way}</span>
	</div>


</div>