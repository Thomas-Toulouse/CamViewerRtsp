#!/bin/env python3
import gi
import os
import configparser
gi.require_version('GstVideo', '1.0')
gi.require_version('Gst', '1.0')
gi.require_version('Gdk', '3.0')
gi.require_version('Gtk', '3.0')
from gi.repository import Gst, GLib, GObject,Gtk,Gio,GdkPixbuf
from gi.repository import Gdk, GstVideo
Gtk.init(None)
#Gdk.init(None)
Gst.init(None)

class MainUi(Gtk.Window):
    def GenerateMainUi(self):
        Gdk.set_allowed_backends("wayland,x11")
        builder=Gtk.Builder()

        Gtk.Window.__init__(self, title="headerBar")
        self.set_default_size(800, 450)
        grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = True)

        self.set_border_width(10)
        clientBtn = Gtk.Button(label="client")
        clientBtn.connect("clicked",self.loadClient)

        serverBtn = Gtk.Button(label="Server")
        serverBtn.connect("clicked",self.loadServer)

        headerBar = Gtk.HeaderBar()
        headerBar.set_show_close_button(True)
        headerBar.props.title = "Magic Eye"
        self.set_titlebar(headerBar)

        self.popover = Gtk.Popover()
        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL)
        aboutBtn=Gtk.Button(label="About",relief=2)
        optionBtn=Gtk.Button(label="Option",relief=2)
        vbox.pack_start(aboutBtn, False, True, 10)
        vbox.pack_end(optionBtn,False, True, 10)
        optionBtn.connect("clicked",self.onLoadOption)
        aboutBtn.connect("clicked",self.onLoadDialogAbout)
        vbox.show_all()
        self.popover.add(vbox)
        self.popover.set_position(Gtk.PositionType.BOTTOM)

        button = Gtk.MenuButton(popover=self.popover)
        
        #look in user icon dir
        icon = Gio.ThemedIcon(name="open-menu-symbolic")
        image = Gtk.Image.new_from_gicon(icon, Gtk.IconSize.BUTTON)
        button.add(image)
        headerBar.pack_end(button)
        
        window= Gtk.Window
        grid.add(clientBtn)
        grid.attach(serverBtn, 1, 0, 1, 1)
        self.add(grid)
class GstWidget(Gtk.Box):
    def __init__(self, pipeline):
        super().__init__()
        self.connect('realize', self._on_realize)
        self._bin = Gst.parse_bin_from_description('videotestsrc', True)

    def _on_realize(self, widget):
        pipeline = Gst.Pipeline()
        factory = pipeline.get_factory()
        gtksink = factory.make('gtksink')
        pipeline.add(gtksink)
        pipeline.add(self._bin)
        self._bin.link(gtksink)
        self.pack_start(gtksink.props.widget, True, True, 0)
        gtksink.props.widget.show()
        pipeline.set_state(Gst.State.PLAYING)


class ClientUi(Gtk.Window):
    def GenerateClientUi(self):

            Gtk.Window.__init__(self, title="Magic Eye: Client")
            
            screenWidth = Gtk.Window().get_screen().get_width()
            screenHeight = Gtk.Window().get_screen().get_height()
            self.connect('destroy', self.quit)
            self.set_default_size(800, 550)
            self.set_border_width(10)
            
            # Create DrawingArea for video widget
            self.drawingarea = Gtk.DrawingArea()
            self.drawingarea.set_content_height = screenHeight
            self.drawingarea.set_content_width = screenWidth
          
            # Create a grid for the DrawingArea and buttons
            grid = Gtk.Grid(row_spacing=10, column_spacing=10, column_homogeneous=False)
            self.add(grid)
            grid.set_column_spacing(10)
            grid.set_row_spacing(5)
            grid.attach(self.drawingarea, 0, 1, 8, 1)
            print(grid.get_child_at(1, 1))
            self.drawingarea.set_hexpand(True)
            self.drawingarea.set_vexpand(True)

            widget = GstWidget('videotestsrc')
            widget.set_size_request(200, 200)
            
            self.add(widget)
            grid.attach(widget, 0, 1, 8, 1)
            # Quit button
            quit = Gtk.Button(label="disconnect stream  ")
            quit.connect("clicked", self.exit_Stream)
            grid.attach(quit, 0, 2, 2, 1)

            # textbox
            global entry
            entry = Gtk.Entry()
            grid.attach_next_to(entry, quit, Gtk.PositionType.RIGHT, 4, 1)
            entry.set_placeholder_text("Server IP adress")
            self.entry = entry

            # link Ip button
            link = Gtk.Button(label="Link IP")
            link.connect("clicked", self.connexion_rtsp)
        
            # Create GStreamer pipeline
            grid.attach_next_to(link, entry, Gtk.PositionType.RIGHT, 2, 1)

    def Get_Entry(self,text):
        text = entry.get_text() 
        return text


class ServerUI(Gtk.Window):
    def Ui(self):
            app_name = "MagicEye"
            config_folder = os.path.join(os.path.expanduser("~"), '.config', app_name)
            settings_file = "settings.conf"
            full_config_file_path = os.path.join(config_folder, settings_file)
            config = configparser.ConfigParser()
            global entry  
            entry = Gtk.Entry()
            Gtk.Window.__init__(self, title="Magic Eye: Server")
            print (Gtk.Window().get_screen().get_width())
            self.set_default_size(800, 450)
            self.set_border_width(10)


            grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = True)
            grid.set_row_homogeneous(False)
            grid.set_vexpand(True)
            grid.set_hexpand(True)
            self.add(grid)
            
            grid.set_column_spacing(10)
            grid.set_row_spacing(5)
            vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL)
            entry.set_editable(False)
            entry.set_placeholder_text("Server IP adress")
            grid.attach(entry,5 ,9, 1, 1)   
            frame = Gtk.Frame(label="Options")
            CamModeV4l2src = Gtk.CheckButton(label="v4l2src")
            CamModeV4l2src.connect("toggled", self.on_button_toggled, "v4l2src")
            vbox.add(CamModeV4l2src)
            frame.add(vbox)
            print(CamModeV4l2src.get_active())
            vbox.set_border_width(10)
            connectButton = Gtk.Button(label="start stream")
            connectButton.connect("clicked", self.Connect)

            grid.attach(connectButton, 5,6, 1, 1)
            for config['CAMERA_OPTION'].items in config['CAMERA_OPTION']:
                 CamModeRpicam = Gtk.CheckButton(label="rpicamsrc")
                 CamModeRpicam.connect("toggled", self.on_button_toggled, "rpicamsrc")
                 grid.attach(frame,0,0,2,1)
                 vbox.add(CamModeRpicam)
            CamModeRpicam = Gtk.CheckButton(label="rpicamsrc")
            CamModeRpicam.connect("toggled", self.on_button_toggled, "rpicamsrc")
            grid.attach(frame,0,0,2,1)
            vbox.add(CamModeRpicam)

            CamModeV4l2src.set_tooltip_text("This option is for camera like a laptop webcam or any other external webcam and the raspberrypi (64 bits OS)")
            CamModeRpicam.set_tooltip_text("(Leagacy option )This option is made for the camera module of the raspberrypi.For best result use it if your OS is 32 bits. ")
            print(CamModeRpicam.get_active())
            self.connect('destroy', self.quit)

    def Set_Entry(self,ip):
         entry.set_text(ip)


class OptionUI(Gtk.Dialog):
        def __init__(self, parent):
                super().__init__(title="Magic Eye: Option", transient_for=parent, flags=0)
                grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = False)
                grid.set_row_homogeneous(False)
                grid.set_vexpand(True)
                grid.set_hexpand(True)

                self.set_default_size(800, 450)
                vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
                #self.add(vbox)
                #grid.attach(connectButton, 1,1, 1, 1)
                label = Gtk.Label(label="Launch option: ")
                label.set_justify(Gtk.Justification.LEFT)
                entry_launch= Gtk.Entry()
                #vbox.pack_start(entry_launch, True, True, 10)
                grid.attach(label, 1,2, 1, 1)
                grid.attach_next_to(entry_launch,label,Gtk.PositionType.RIGHT,9,1)
                box = self.get_content_area()
                box.add(grid)
                #box.add(label)
               # box.add(entry_launch)
                self.show_all()
