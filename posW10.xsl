<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" indent="yes" encoding="GB2312"/>
	<xsl:param name="type"/>
	<xsl:param name="city"/>
	<xsl:template match="/list">
		<xsl:choose>
			<xsl:when test="$city!='' and $type!=''">
				<xsl:for-each select="//rows/row[@type_cn=$type and @city=$city]">
					<div class="item">
						<div class="job_con_head">
							
							<span class="icon"/>
							<a href="javascript:;" class="show_all">查看详情</a>
							<span class="head_pos">
								<xsl:value-of select="@city" disable-output-escaping="yes"/>
							</span>
							<span class="job_name">
								<xsl:value-of select="@title_cn" disable-output-escaping="yes"/>
							</span>
						</div>
						<div class="job_con_body">
							<p class="title"><xsl:value-of select="@title_cn" disable-output-escaping="yes"/></p>
							<a href="http://applformweb.chinahr.com/volunteer/qiyi2017/{@id}" class="apply_btn">投递简历</a>
							<p class="pos">
								<b>工作地点：</b><xsl:value-of select="@city" disable-output-escaping="yes"/></p>
							<div class="inner">
								<p>
									<xsl:value-of select="description/." disable-output-escaping="yes"/>
								</p>
							</div>
						</div>
					</div>
				</xsl:for-each>
			</xsl:when>
			<xsl:when test="$city!=''">
				<xsl:for-each select="//rows/row[@city=$city]">
					<div class="item">
						<div class="job_con_head">
							<span class="icon"/>
							<a href="javascript:;" class="show_all">查看详情</a>
							<span class="head_pos">
								<xsl:value-of select="@city" disable-output-escaping="yes"/>
							</span>
							<span class="job_name">
								<xsl:value-of select="@title_cn" disable-output-escaping="yes"/>
							</span>
						</div>
						<div class="job_con_body">
							<p class="title"><xsl:value-of select="@title_cn" disable-output-escaping="yes"/></p>
							<a href="http://applformweb.chinahr.com/volunteer/qiyi2017/{@id}" class="apply_btn">投递简历</a>
							<p class="pos">
								<b>工作地点：</b><xsl:value-of select="@city" disable-output-escaping="yes"/></p>
							<div class="inner">
								<p>
									<xsl:value-of select="description/." disable-output-escaping="yes"/>
								</p>
							</div>
						</div>
					</div>
				</xsl:for-each>
			</xsl:when>
			<xsl:when test="$type!=''">
				<xsl:for-each select="//rows/row[@type_cn=$type]">
					<div class="item">
						<div class="job_con_head">
							<span class="icon"/>
							<a href="javascript:;" class="show_all">查看详情</a>
							<span class="head_pos">
								<xsl:value-of select="@city" disable-output-escaping="yes"/>
							</span>
							<span class="job_name">
								<xsl:value-of select="@title_cn" disable-output-escaping="yes"/>
							</span>
						</div>
						<div class="job_con_body">
							<p class="title"><xsl:value-of select="@title_cn" disable-output-escaping="yes"/></p>
							<a href="http://applformweb.chinahr.com/volunteer/qiyi2017/{@id}" class="apply_btn">投递简历</a>
							<p class="pos">
								<b>工作地点：</b><xsl:value-of select="@city" disable-output-escaping="yes"/></p>
							<div class="inner">
								<p>
									<xsl:value-of select="description/." disable-output-escaping="yes"/>
								</p>
							</div>
						</div>
					</div>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="//rows/row">
					<div class="item">
						<div class="job_con_head">
							<span class="icon"/>
							<a href="javascript:;" class="show_all">查看详情</a>
							<span class="head_pos">
								<xsl:value-of select="@city" disable-output-escaping="yes"/>
							</span>
							<span class="job_name">
								<xsl:value-of select="@title_cn" disable-output-escaping="yes"/>
							</span>
						</div>
						<div class="job_con_body">
							<p class="title"><xsl:value-of select="@title_cn" disable-output-escaping="yes"/></p>
							<a href="http://applformweb.chinahr.com/volunteer/qiyi2017/{@id}" class="apply_btn">投递简历</a>
							<p class="pos">
								<b>工作地点：</b><xsl:value-of select="@city" disable-output-escaping="yes"/></p>
							<div class="inner">
								<p>
									<xsl:value-of select="description/." disable-output-escaping="yes"/>
								</p>
							</div>
						</div>
					</div>
				</xsl:for-each>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
