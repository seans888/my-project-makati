<?php
/**
* (¯`·.¸¸.-> °º★ вүgιяσ.cσм ★º° <-.¸¸.·´¯)
* @version		0.4.4
* @package		jForms
* @subpackage	
* @copyright	G. Tomaselli
* @author		Girolamo Tomaselli - http://bygiro.com - girotomaselli@gmail.com
* @MVC			basic MVC generated with Cook Self Service  V2.6.4 - www.j-cook.pro
* @license		GNU GPL v3 or later
*
*/


// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
if(!defined('DS')) define('DS',DIRECTORY_SEPARATOR);

//Copy this line to be able to call the application from outside (Module, Plugin, Third component, ...)
require_once(JPATH_ADMINISTRATOR.DS.'components'.DS.'com_jforms'.DS.'helpers'.DS.'loader.php');

// load the controller to load all the models and other needed classes
$controller = CkJController::getInstance('Jforms');

//Document title
$document	= JFactory::getDocument();
$document->titlePrefix = JText::_('JFORMS_JFORMS') . ' - ';
$document->titleSuffix = '';

if (defined('JDEBUG') && count($_POST))
	$_SESSION['Jforms']['$_POST'] = $_POST;

$app = JFactory::getApplication();
$jinput = $app->input;
// When this component is called to return a file
// TODO : A better practice is to call it through the View Class
if ($jinput->get('task', null, 'CMD') == 'file')
	JformsClassFile::returnFile('db');


if ($jinput->get('task', null, 'CMD') == 'callback'){	
	$model = CkJModel::getInstance('submission', 'JformsModel');		
	$result = $model->runCallback();
	
	echo $result ? 'OK' : 'FAILED';		
	$app->close();	
}
	
	

$controller->execute($jinput->get('task', null, 'CMD'));
$controller->redirect();
