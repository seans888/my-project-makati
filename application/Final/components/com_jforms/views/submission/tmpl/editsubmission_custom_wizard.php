<?php
/*
* @version		0.4.4
* @package		jForms
* @subpackage	Submissions
* @copyright	G. Tomaselli
* @author		Girolamo Tomaselli - http://bygiro.com - girotomaselli@gmail.com
* @license		GNU GPL v3 or later
*/

// no direct access
defined('_JEXEC') or die('Restricted access');

$options = $this->form->jForm->options;

$style = '';
if(empty($options->show_wizard_nav)){
	$style = 'display: none;';
}
?>

<div id="<?php echo $this->form->jForm->formHash ?>_wizard" class="wizard" style="<?php echo $style; ?>">
	<ul class="steps">
	<?php
			$steps = ByGiroHelper::sort_on_field($this->wizard_steps, 'step_ordering');
			foreach($steps as $step){
				?>				
				<li data-target="#<?php echo $this->form->jForm->formHash .'Step'. $step['hash'] ?>" class="step">
					<span class="badge"></span>
					<?php echo $step['name']; ?>
					<span class="chevron"></span>
				</li>
	  <?php } ?>		
	</ul>
	<div class="actions">
		<div class="act">
			<span class="btn btn-mini jForms_btn-prev btn-prev">
				<i class="icomoon icon-arrow-left"></i>
				<?php echo JText::_("JFORMS_PREV"); ?>
			</span>
		</div>
		<div class="act">
			<span class="btn btn-mini jForms_btn-next btn-next">
				<?php echo JText::_("JFORMS_NEXT"); ?>
				<i class="icomoon icon-arrow-right"></i>				
			</span>
		</div>
	</div>
</div>
<div class="step-content">
	<?php echo $this->layout; ?>
	
	<div class="footer_actions">
		<div class="action_left">
			<span class="btn jForms_btn-prev">
				<i class="icomoon icon-arrow-left"></i>
				<?php echo JText::_("JFORMS_PREV"); ?>
			</span>
		</div>
		<div  class="action_right">
			<span class="btn jForms_btn-next">
				<?php echo JText::_("JFORMS_NEXT"); ?>
				<i class="icomoon icon-arrow-right"></i>
			</span>
		</div>
	</div>
</div>

<script type="text/javascript">
jQuery(document).ready(function(){
	var formName = '<?php echo $this->form->jForm->formHash ?>';
	jQuery('#'+formName+'_wizard').wizard({
		nextButtons: '.jForms_btn-next',
		prevButtons: '.jForms_btn-prev',
		text:{
			finished: '<?php echo JText::_("JFORMS_SUBMIT"); ?>'
		}
	});
	
	jQuery('#'+formName+'_wizard').on('changeStep',function(e,data){
		if(data.direction == 'next'){
			if(!checkFormStep(data.step,formName)){
				e.preventDefault();
			} else {
				var scroll_opts = {
						target: '#'+formName+'_wizard'
					}
				scrollToElement( scroll_opts );
<?php if(isset($options->enable_partial_save) AND $options->enable_partial_save AND 1==0){ 
	JDom::_('framework.jquery.ajax');
?>
				if(typeof window[formName +'_stepsData'] == 'undefined'){
					window[formName +'_stepsData'] = [];
				}
				// save current and previous steps
				var step,fId=<?php echo $this->form->jForm->id ?>,
					tk="<?php echo JSession::getFormToken() ?>",
					changed,stepsData = [];
				for(var i=1;i<=data.step;i++){
					step = jQuery('#'+ formName +'Step'+data.step);
					stepsData[data.step] = step.serializeObject();
				}
				
				// compare objects
				changed = !(JSON.stringify(window[formName +'_stepsData']) === JSON.stringify(stepsData));
				if(changed){
					submitStep(fId,stepsData,tk);
					window[formName +'_stepsData'] = stepsData;
				}				
<?php } ?>
			}
		} else {
			var scroll_opts = {
					target: '#'+formName+'_wizard'
				}
			scrollToElement(scroll_opts);
		}
	});
	
	jQuery('#'+formName+'_wizard').on('finished',function(e,data){
		if(checkFormStep(data.step,formName)){
			Joomla.submitform('<?php echo $this->form_task; ?>','#'+formName);
		}
	});
	
	jQuery('#'+formName+'_wizard ul.steps li').each(function(i){
		var step = jQuery(this),
			step_tg = jQuery(step.attr('data-target')),
			badge = step.find('.badge');
			
		if(i==0){
			step.addClass('active');
			step_tg.addClass('active');
			badge.addClass('badge-info');
		}
		
		badge.text(i+1);
	});
	
});
</script>