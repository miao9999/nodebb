<div component="composer"
	 class="composer<!-- IF resizable --> resizable<!-- ENDIF resizable --><!-- IF !isTopicOrMain --> reply<!-- ENDIF !isTopicOrMain -->">


	<div class="composer-container">
		<nav class="navbar navbar-fixed-top mobile-navbar hidden-md hidden-lg">
			<div class="btn-group">
				<button class="btn btn-sm btn-primary composer-discard" data-action="discard" tabindex="-1"><i
							class="fa fa-times"></i></button>
				<button class="btn btn-sm btn-primary composer-minimize" data-action="minimize" tabindex="-1"><i
							class="fa fa-minus"></i></button>
			</div>
			<!-- IF isTopic -->
			<div class="category-name-container">
				<span class="category-name"></span> <i class="fa fa-sort"></i>
			</div>
			<!-- ENDIF isTopic -->
			<!-- IF !isTopicOrMain -->
			<h4 class="title">[[topic:composer.replying_to, "{title}"]]</h4>
			<!-- ENDIF !isTopicOrMain -->
			<div class="btn-group">
				<button class="btn btn-sm btn-primary composer-submit" data-action="post" tabindex="-1"><i
							class="fa fa-chevron-right"></i></button>
			</div>
		</nav>
		<div class="row title-container">
			<!-- IF showHandleInput -->
			<div class="col-sm-3 col-md-12">
				<input class="handle form-control" type="text" tabindex="1"
					   placeholder="[[topic:composer.handle_placeholder]]" value="{handle}"/>
			</div>
			<!-- ENDIF showHandleInput -->
			<div>
				<!-- IF isTopicOrMain -->
				<input class="title form-control" type="text" tabindex="1"
					   placeholder="[[topic:composer.title_placeholder]]" value="{title}"/>
				<!-- ELSE -->
				<span class="title form-control">[[topic:composer.replying_to, "{title}"]]</span>
				<!-- ENDIF isTopicOrMain -->
				<ul class="dropdown-menu quick-search-results hidden">
					<!-- IMPORT partials/quick-search-results.tpl -->
				</ul>
			</div>


			<!-- IF isTopic -->
			<div class="category-list-container hidden-sm hidden-xs"></div>
			<!-- ENDIF isTopic -->

			<div class="pull-right draft-icon hidden-xs hidden-sm"></div>

			<div class="btn-group pull-right action-bar hidden-sm hidden-xs">
				<button class="btn btn-default composer-discard" data-action="discard" tabindex="-1"><i
							class="fa fa-times"></i> [[topic:composer.discard]]
				</button>

				<button class="btn btn-primary composer-submit" data-action="post" tabindex="6"><i
							class="fa fa-check"></i> [[topic:composer.submit]]
				</button>
			</div>
		</div>

		<div class="category-tag-row">
			<div class="btn-toolbar formatting-bar">
				<ul class="formatting-group">
					<!-- BEGIN formatting -->
					<!-- IF formatting.spacer -->
					<li class="spacer"></li>
					<!-- ELSE -->
					<!-- IF !formatting.mobile -->
					<li tabindex="-1" data-format="{formatting.name}" title="{formatting.title}"><i
								class="{formatting.className}"></i></li>
					<!-- ENDIF !formatting.mobile -->
					<!-- ENDIF formatting.spacer -->
					<!-- END formatting -->

					<!--[if gte IE 9]><!-->
					<!-- IF privileges.upload:post:image -->
					<li class="img-upload-btn hide" data-format="picture" tabindex="-1"
						title="[[modules:composer.upload-picture]]">
						<i class="fa fa-file-image-o"></i>
					</li>
					<!-- ENDIF privileges.upload:post:image -->
					<!-- IF privileges.upload:post:file -->
					<li class="file-upload-btn hide" data-format="upload" tabindex="-1"
						title="[[modules:composer.upload-file]]">
							<span class="fa-stack">
								<i class="fa fa-file-o fa-stack-1x"></i>
								<i class="fa fa-arrow-up fa-stack-1x"></i>
							</span>
					</li>
					<!-- ENDIF privileges.upload:post:file -->
					<!--<![endif]-->

					<!-- IF allowTopicsThumbnail -->
					<li tabindex="-1">
						<i class="fa fa-th-large topic-thumb-btn topic-thumb-toggle-btn hide"
						   title="[[topic:composer.thumb_title]]"></i>
					</li>
					<div class="topic-thumb-container center-block hide">
						<form id="thumbForm" method="post" class="topic-thumb-form form-inline"
							  enctype="multipart/form-data">
							<img class="topic-thumb-preview"></img>
							<div class="form-group">
								<label for="topic-thumb-url">[[topic:composer.thumb_url_label]]</label>
								<input type="text" id="topic-thumb-url" class="form-control"
									   placeholder="[[topic:composer.thumb_url_placeholder]]"/>
							</div>
							<div class="form-group">
								<label for="topic-thumb-file">[[topic:composer.thumb_file_label]]</label>
								<input type="file" id="topic-thumb-file" class="form-control"/>
							</div>
							<div class="form-group topic-thumb-ctrl">
								<i class="fa fa-spinner fa-spin hide topic-thumb-spinner"
								   title="[[topic:composer.uploading]]"></i>
								<i class="fa fa-times topic-thumb-btn hide topic-thumb-clear-btn"
								   title="[[topic:composer.thumb_remove]]"></i>
							</div>
						</form>
					</div>
					<!-- ENDIF allowTopicsThumbnail -->

					<form id="fileForm" method="post" enctype="multipart/form-data">
						<!--[if gte IE 9]><!-->
						<input type="file" id="files" name="files[]" multiple class="gte-ie9 hide"/>
						<!--<![endif]-->
						<!--[if lt IE 9]>
						<input type="file" id="files" name="files[]" class="lt-ie9 hide" value="Upload"/>
						<![endif]-->
					</form>
				</ul>
			</div>
		</div>

		<div class="row write-preview-container">
			<div class="write-container">
				<div class="help-text">
					<span class="help hidden">[[modules:composer.compose]] <i class="fa fa-question-circle"></i></span>
					<span class="toggle-preview hide">[[modules:composer.show_preview]]</span>
				</div>
				<div class="pull-right draft-icon hidden-md hidden-lg"></div>
				<textarea class="write" tabindex="4"></textarea>
			</div>
			<div class="hidden-sm hidden-xs preview-container">
				<div class="help-text">
					<span class="toggle-preview">[[modules:composer.hide_preview]]</span>
				</div>
				<div class="preview well"></div>
			</div>
		</div>

		<!-- IF isTopicOrMain -->
		<div class="tag-row">
			<div class="tags-container">
				<div class="btn-group dropup <!-- IF !tagWhitelist.length -->hidden<!-- ENDIF !tagWhitelist.length -->"
					 component="composer/tag/dropdown">
					<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">
						<span class="visible-sm-inline visible-md-inline visible-lg-inline"><i
									class="fa fa-tags"></i></span>
						<span class="caret"></span>
					</button>

					<ul class="dropdown-menu">
						<!-- BEGIN tagWhitelist -->
						<li data-tag="@value"><a href="#">@value</a></li>
						<!-- END tagWhitelist -->
					</ul>
				</div>
				<input class="tags" type="text" class="form-control"
					   placeholder="[[tags:enter_tags_here, {minimumTagLength}, {maximumTagLength}]]" tabindex="5"/>
			</div>
		</div>
		<!-- ENDIF isTopicOrMain -->

		<!-- IF isTopic -->
		<ul class="category-selector visible-xs visible-sm">

		</ul>
		<!-- ENDIF isTopic -->

		<div class="imagedrop">
			<div>[[topic:composer.drag_and_drop_images]]</div>
		</div>

		<!-- <div class="resizer"><div class="trigger text-center"><i class="fa"></i></div></div> -->

		<!--这里是注释 -->


		<div class="other ">
			<!-- 版块
            <div class="categories item">
                <label class="biaoti">版块</label>
                <div class="block">
                    <select class="xuanxiang" name="category" lay-verify="required">
                        <option value="0">业务开发</option>
                        <option value="1">研发工程&容器</option>
                        <option value="2">移动开发</option>
                        <option value="3">大数据</option>
                        <option value="5">人工智能</option>
                        <option value="6">空间信息</option>
                        <option value="7">物联网</option>
                        <option value="8">虚实融合</option>
                    </select>
                </div>
            </div>
        -->
			<form action="">
			<!-- 应用平台产品 -->
			<div class="products item">
				<label class="biaoti">应用平台产品</label>
				<!-- 业务开发 -->
				<div class="cagegory_1 block">
					<select class="xuanxiang" name="product" id="product" lay-verify="required">
						<option value="0">Casicyber Dev (Monolithic)</option>
						<option value="1">Casicyber Dev (Microservice)</option>
					</select>
				</div>
				<!-- 研发工程&容器 -->
				<div class="cagegory_2 block" style="display: none;">
					<select class="xuanxiang" name="product" id="product" lay-verify="required">
						<option value="0">Casicyber CEM</option>
						<option value="1">Casicyber DevOps</option>
					</select>
				</div>
				<!-- 大数据 -->
				<div class="cagegory_3 block" style="display: none;">
					<select class="xuanxiang" name="product" lay-verify="required">
						<option value="0">Casicyber DataBT</option>
						<option value="1">Casicyber DataV</option>
						<option value="2">Casicyber DataE</option>
					</select>
				</div>
				<!-- 移动开发 -->
				<div class="cagegory_4 block" style="display: none;">
					<select class="xuanxiang" name="product" lay-verify="required">
						<option value="0">Casicyber Mobile</option>
					</select>
				</div>

				<!-- 人工人智能 -->
				<div class="cagegory_5 block" style="display: none;">
					<select class="xuanxiang" name="product" lay-verify="required">
						<option value="0">Casicyber NLP</option>
					</select>
				</div>
				<!-- 空间信息-->
				<div class="cagegory_6 block" style="display: none;">
					<select class="xuanxiang" name="product" lay-verify="required">
						<option value="0">Casicyber Map</option>
						<option value="1">Casicyber Earth</option>
					</select>
				</div>
				<!-- 物联网 -->
				<div class="cagegory_7 block" style="display: none;">
					<select name="product" lay-verify="required">
						<option value="0">Casicyber IOT</option>
					</select>
				</div>
				<!-- 虚实融合 -->
				<div class="cagegory_8 block" style="display: none;">
					<select class="xuanxiang" name="product" lay-verify="required">
						<option value="0">Casicyber VisIn</option>
					</select>
				</div>
			</div>


			<!-- 产品版本 -->

			<div class="versions item">
				<label class="biaoti">产品版本</label>
				<div class="block">
					<select class="xuanxiang" name="version" lay-verify="required">
						<option value="0">1.0.0</option>
						<!-- <option value="1">1.0.0</option>
						<option value="2">1.0.0</option>
						<option value="3">1.0.0</option>
						<option value="5">1.0.0</option> -->
					</select>
				</div>
			</div>


			<!-- 问题类型 -->
			<div class="question_types item">
				<label class="biaoti">问题类型</label>
				<div class="block">
					<select class="xuanxiang" name="question_type" lay-verify="required">
						<option value="0">应用问题</option>
						<option value="1">技术问题</option>
						<option value="2">功能需求</option>
						<option value="3">bug 反馈</option>
					</select>
				</div>
			</div>

			<!-- 所属事业部-->
			<div class="apartments item">
				<label class="biaoti">所属事业部</label>
				<div class="block">
					<select class="xuanxiang" name="apartment" lay-verify="required">
						<option value="0">创新（技术）研究中心</option>
						<!-- <option value="1">创新（技术）研究中心</option>
						<option value="2">创新（技术）研究中心</option>
						<option value="3">创新（技术）研究中心</option> -->
					</select>
				</div>
			</div>

			<!-- 所属项目-->

			<div class="projects item">
				<label class="biaoti">所属项目</label>
				<div class="block">
					<select class="xuanxiang" name="project" lay-verify="required">
						<option value="0">容器云</option>
						<!-- <option value="1">项目一</option>
						<option value="2">项目一</option>
						<option value="3">项目一</option> -->
					</select>
				</div>
			</div>
			<!-- 邀请回答人-->

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
				<label class="biaoti">运行环境</label>
				<input class="shuru" lay-verify="required">
			</div>
			<!-- 急切程度 -->

			<div class="degree item">
				<label class="biaoti">急切程度</label>
				<div class="block">
					<select class="xuanxiang" name="degree" lay-verify="required">
						<option value="1">★</option>
						<option value="2">★★</option>
						<option value="3">★★★</option>
						<option value="4">★★★★</option>
						<option value="5">★★★★★</option>
					</select>
				</div>
			</div>
			<!-- 联系人 -->

			<div class="contact item">
				<label class="biaoti"> 联系人</label>
				<input class="shuru">
			</div>

			<!-- 联系方式 -->

			<div class="contact_way item">
				<label class="biaoti"> 联系方式</label>
				<input class="shuru">
			</div>

			</form>


	</div>
</div>
