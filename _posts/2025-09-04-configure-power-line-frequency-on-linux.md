---
layout: post
title: "Configure Power Line Frequency on Linux"
description: "Step-by-step guide to configure Logitech Brio 100 webcam’s power-line frequency automatically on Manjaro Linux (Arch-based) using udev rules and v4l2-ctl."
categories: [Linux, Hardware, Configuration]
tags: [Linux, Arch, Manjaro]
redirect_from:
  - /2025/09/04/
---

> Originally written on **04 September 2025, 01:15**

* Table of Contents
{:toc .toc}

# Intuition

By default, webcams like the **Logitech Brio 100** may not automatically adjust to the correct **power-line frequency** (50 Hz in most regions, 60 Hz in some).  
This mismatch often causes **flickering under artificial lighting**.  

The goal is to configure the Brio 100 to **always set the correct power-line frequency** automatically when plugged in, using:

* `udev` rules (to trigger configuration when device is detected)  
* `v4l2-ctl` (from `v4l-utils`) to control video device parameters  

---

## 1. Identify Device IDs

First, plug in the webcam and check its **vendor** and **product IDs**:

```bash
lsusb
````

Example output:

```bash
Bus 003 Device 009: ID 046d:094c Logitech, Inc. Brio 100
```

* **Vendor ID (VID):** `046d`
* **Product ID (PID):** `094c`

---

## 2. Install Required Tools

The tool `v4l2-ctl` is part of **v4l-utils**.

```bash
sudo pacman -S v4l-utils
```

Check installation:

```bash
v4l2-ctl --version
```

---

## 3. Create the Udev Rule

Create a new rules file:

```bash
sudo nano /etc/udev/rules.d/99-logitech-brio.rules
```

Add the following rule:

```udev
SUBSYSTEM=="usb", ATTRS{idVendor}=="046d", ATTRS{idProduct}=="094c", RUN+="/usr/bin/v4l2-ctl -d /dev/video%n --set-ctrl=power_line_frequency=1"
```

> **Note:**
>
> * `power_line_frequency=1` = **50 Hz**
> * `power_line_frequency=2` = **60 Hz**

---

## 4. Apply the Rule

Reload the udev rules:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

Replug the webcam (or reboot the system).

---

## 5. Verify

List all video devices:

```bash
v4l2-ctl --list-devices
```

Check if the control is applied:

```bash
v4l2-ctl -d /dev/video0 --get-ctrl=power_line_frequency
```

Expected output:

```bash
power_line_frequency: 1
```

---

## 6. Debugging

If the rule doesn’t trigger, try:

1. **Test manually:**

   ```bash
   sudo udevadm test /sys/class/video4linux/video0
   ```

   Look for your `v4l2-ctl` command in the logs.

2. **Check system logs:**

   ```bash
   journalctl -u systemd-udevd -f
   ```

---
